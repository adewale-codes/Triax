import logging
import os
from uuid import UUID

import httpx
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.policy_document import PolicyDocument
from models.ticket import Ticket

logger = logging.getLogger(__name__)

OLLAMA_BASE_URL = os.environ.get("OLLAMA_BASE_URL", "http://ollama:11434")
LLM_MODEL = os.environ.get("LLM_MODEL", "llama3.1:8b")
EMBED_MODEL = os.environ.get("EMBED_MODEL", "nomic-embed-text")

_VALID_ISSUE_TYPES = {
    "payment_failure",
    "p2p_dispute",
    "kyc_query",
    "fraud_flag",
    "withdrawal_issue",
    "general_enquiry",
}


async def embed_text(text: str) -> list[float]:
    async with httpx.AsyncClient(base_url=OLLAMA_BASE_URL, timeout=120) as client:
        response = await client.post("/api/embed", json={"model": EMBED_MODEL, "input": text})
        response.raise_for_status()
        return response.json()["embeddings"][0]


async def _chat(system: str, user: str) -> str:
    async with httpx.AsyncClient(base_url=OLLAMA_BASE_URL, timeout=300) as client:
        response = await client.post(
            "/api/chat",
            json={
                "model": LLM_MODEL,
                "messages": [
                    {"role": "system", "content": system},
                    {"role": "user", "content": user},
                ],
                "stream": False,
            },
        )
        response.raise_for_status()
        return response.json()["message"]["content"].strip()


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
    system = (
        "You are a fintech support classifier. Respond with ONLY one of these exact words, nothing else: "
        "payment_failure, p2p_dispute, kyc_query, fraud_flag, withdrawal_issue, general_enquiry"
    )
    user = (
        f"Title: {title}\nDescription: {description}\n\n"
        f"Relevant policy context:\n{docs_context}"
    )
    raw = await _chat(system, user)
    result = raw.lower().strip()
    return result if result in _VALID_ISSUE_TYPES else "general_enquiry"


async def score_urgency(title: str, description: str, issue_type: str) -> int:
    system = (
        "You are an urgency scorer. Respond with ONLY a single digit between 1 and 5, nothing else. "
        "5 is most urgent. Score higher for financial loss, fraud keywords, account access issues. "
        "Score lower for general questions and informational requests."
    )
    user = f"Issue type: {issue_type}\nTitle: {title}\nDescription: {description}"
    raw = await _chat(system, user)
    try:
        return int(raw.strip())
    except ValueError:
        return 3


async def generate_reply(
    title: str, description: str, issue_type: str, relevant_docs: list[dict]
) -> str:
    docs_context = "\n".join(
        f"[{d['category']}] {d['title']}: {d['content']}" for d in relevant_docs
    )
    system = (
        "You are a professional fintech customer support agent. "
        "Write a professional, empathetic first response to the customer's support ticket. "
        "Reference relevant policy information where appropriate. Be concise and helpful."
    )
    user = (
        f"Issue type: {issue_type}\nTitle: {title}\nDescription: {description}\n\n"
        f"Relevant policies:\n{docs_context}"
    )
    return await _chat(system, user)


async def build_explanation(
    title: str, issue_type: str, urgency_score: int, relevant_docs: list[dict]
) -> str:
    docs_titles = ", ".join(d["title"] for d in relevant_docs) if relevant_docs else "none"
    system = (
        "You are a fintech support triage assistant. Explain in 2-3 sentences why "
        "the ticket was classified with this issue type and why it received this urgency score. "
        "Be plain and direct."
    )
    user = (
        f"Title: {title}\nClassification: {issue_type}\n"
        f"Urgency score: {urgency_score}/5\n"
        f"Relevant policies consulted: {docs_titles}"
    )
    return await _chat(system, user)


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
