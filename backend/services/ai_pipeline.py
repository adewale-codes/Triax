import logging
import os
from uuid import UUID

from openai import AsyncOpenAI
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.policy_document import PolicyDocument
from models.ticket import Ticket

logger = logging.getLogger(__name__)

client = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


async def embed_text(text: str) -> list[float]:
    response = await client.embeddings.create(
        model="text-embedding-ada-002",
        input=text,
    )
    return response.data[0].embedding


async def search_relevant_docs(db: AsyncSession, query: str, limit: int = 3) -> list[dict]:
    embedding = await embed_text(query)
    result = await db.execute(
        select(PolicyDocument)
        .where(PolicyDocument.embedding.isnot(None))
        .order_by(PolicyDocument.embedding.cosine_distance(embedding))
        .limit(limit)
    )
    docs = result.scalars().all()
    return [{"title": doc.title, "content": doc.content, "category": doc.category} for doc in docs]


async def classify_ticket(title: str, description: str, relevant_docs: list[dict]) -> str:
    docs_context = "\n".join(
        f"[{d['category']}] {d['title']}: {d['content']}" for d in relevant_docs
    )
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a fintech support classifier. Classify the ticket into exactly one of: "
                    "payment_failure, p2p_dispute, kyc_query, fraud_flag, withdrawal_issue, general_enquiry. "
                    "Return the classification string only, nothing else."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Title: {title}\nDescription: {description}\n\n"
                    f"Relevant policy context:\n{docs_context}"
                ),
            },
        ],
        max_tokens=20,
        temperature=0,
    )
    return response.choices[0].message.content.strip()


async def score_urgency(title: str, description: str, issue_type: str) -> int:
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a fintech support urgency scorer. Rate urgency 1-5 where 5 is most urgent. "
                    "Score higher for: financial loss, fraud keywords, account access issues. "
                    "Score lower for: general questions, informational requests. "
                    "Return only a single integer between 1 and 5."
                ),
            },
            {
                "role": "user",
                "content": f"Issue type: {issue_type}\nTitle: {title}\nDescription: {description}",
            },
        ],
        max_tokens=5,
        temperature=0,
    )
    try:
        return int(response.choices[0].message.content.strip())
    except ValueError:
        return 3


async def generate_reply(
    title: str, description: str, issue_type: str, relevant_docs: list[dict]
) -> str:
    docs_context = "\n".join(
        f"[{d['category']}] {d['title']}: {d['content']}" for d in relevant_docs
    )
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a professional fintech customer support agent. "
                    "Write a professional, empathetic first response to the customer's support ticket. "
                    "Reference relevant policy information where appropriate. Be concise and helpful."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Issue type: {issue_type}\nTitle: {title}\nDescription: {description}\n\n"
                    f"Relevant policies:\n{docs_context}"
                ),
            },
        ],
        max_tokens=400,
        temperature=0.3,
    )
    return response.choices[0].message.content.strip()


async def build_explanation(
    title: str, issue_type: str, urgency_score: int, relevant_docs: list[dict]
) -> str:
    docs_titles = ", ".join(d["title"] for d in relevant_docs) if relevant_docs else "none"
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a fintech support triage assistant. Explain in 2-3 sentences why "
                    "the ticket was classified with this issue type and why it received this urgency score. "
                    "Be plain and direct."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Title: {title}\nClassification: {issue_type}\n"
                    f"Urgency score: {urgency_score}/5\n"
                    f"Relevant policies consulted: {docs_titles}"
                ),
            },
        ],
        max_tokens=150,
        temperature=0.2,
    )
    return response.choices[0].message.content.strip()


async def run_pipeline(db: AsyncSession, ticket_id: str) -> dict:
    result = await db.execute(select(Ticket).where(Ticket.id == UUID(ticket_id)))
    ticket = result.scalar_one_or_none()
    if ticket is None:
        raise ValueError(f"Ticket {ticket_id} not found")

    ticket.processing_status = "processing"
    await db.commit()

    try:
        relevant_docs = await search_relevant_docs(
            db, f"{ticket.title} {ticket.description or ''}"
        )
        issue_type = await classify_ticket(ticket.title, ticket.description or "", relevant_docs)
        urgency_score = await score_urgency(ticket.title, ticket.description or "", issue_type)
        suggested_reply = await generate_reply(
            ticket.title, ticket.description or "", issue_type, relevant_docs
        )
        explanation = await build_explanation(ticket.title, issue_type, urgency_score, relevant_docs)

        ticket.issue_type = issue_type
        ticket.urgency_score = urgency_score
        ticket.suggested_reply = suggested_reply
        ticket.explanation = explanation
        ticket.relevant_docs = relevant_docs
        ticket.processing_status = "completed"
        await db.commit()
        await db.refresh(ticket)

        return {
            "ticket_id": ticket_id,
            "issue_type": issue_type,
            "urgency_score": urgency_score,
            "suggested_reply": suggested_reply,
            "explanation": explanation,
            "relevant_docs": relevant_docs,
            "processing_status": "completed",
        }
    except Exception:
        logger.exception("Pipeline failed for ticket %s", ticket_id)
        ticket.processing_status = "failed"
        await db.commit()
        raise
