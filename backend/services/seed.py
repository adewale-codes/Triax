import logging

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from models.policy_document import PolicyDocument
from services.ai_pipeline import embed_text

logger = logging.getLogger(__name__)

_POLICY_DOCUMENTS = [
    {
        "title": "KYC Identity Verification Requirements",
        "category": "kyc",
        "content": (
            "All users must complete identity verification before accessing full platform features. "
            "Accepted documents include government-issued ID, passport, or driver's license. "
            "Verification typically completes within 24 hours. Users in high-risk jurisdictions may "
            "be required to submit additional documentation. Failure to complete KYC within 30 days "
            "will result in account suspension."
        ),
    },
    {
        "title": "KYC Enhanced Due Diligence",
        "category": "kyc",
        "content": (
            "Enhanced due diligence (EDD) is applied to high-value accounts or politically exposed persons. "
            "EDD requires source-of-funds documentation and may include a video verification step. "
            "Accounts pending EDD review are limited to basic functionality until verification is complete. "
            "EDD reviews typically take 3-7 business days. Users who fail EDD are subject to immediate "
            "account termination."
        ),
    },
    {
        "title": "Payment Processing Timelines",
        "category": "payments",
        "content": (
            "Standard bank transfers are processed within 1-3 business days. Card payments are typically "
            "instant but may take up to 24 hours to reflect. International transfers may take 3-5 business "
            "days depending on the destination country. Payment delays can occur during weekends and public "
            "holidays. If a payment has not arrived after 5 business days, contact support with the "
            "transaction reference."
        ),
    },
    {
        "title": "Failed Payment Recovery Process",
        "category": "payments",
        "content": (
            "Failed payments are automatically retried up to three times over 72 hours. Users are notified "
            "by email and in-app notification after each failed attempt. If all retries fail, the transaction "
            "is cancelled and funds are returned within 3-5 business days. Common causes include insufficient "
            "funds, incorrect account details, and bank-side restrictions. Contact support if a failed "
            "payment is not refunded after 7 days."
        ),
    },
    {
        "title": "P2P Dispute Resolution Policy",
        "category": "disputes",
        "content": (
            "Disputes between users must be reported within 14 days of the transaction. Both parties will "
            "be notified and given 48 hours to provide evidence. Our dispute team will review submissions "
            "and make a binding decision within 5 business days. Funds are held in escrow during the dispute "
            "period. Repeated abuse of the dispute system may result in account restrictions."
        ),
    },
    {
        "title": "Chargeback and Reversal Policy",
        "category": "disputes",
        "content": (
            "Chargebacks initiated through your bank will result in immediate account suspension pending "
            "investigation. Legitimate chargebacks are resolved within 10 business days. Users found to "
            "have filed fraudulent chargebacks will be permanently banned and may face legal action. "
            "To avoid chargebacks, contact our support team first as most issues can be resolved faster "
            "internally. A chargeback fee of $25 may be applied to accounts with repeated chargeback history."
        ),
    },
    {
        "title": "Fraud Detection and Prevention",
        "category": "fraud",
        "content": (
            "Our system uses automated fraud detection to monitor all transactions in real time. Suspicious "
            "activity triggers an immediate account review and temporary hold. Users will be contacted within "
            "2 hours of a fraud flag being raised. Providing false information during a fraud investigation "
            "is grounds for permanent account termination. All fraud cases are reported to the relevant "
            "financial authorities."
        ),
    },
    {
        "title": "Account Freeze and Suspicious Activity",
        "category": "fraud",
        "content": (
            "Accounts may be frozen automatically if unusual login patterns or transaction volumes are detected. "
            "Users are notified immediately via email when an account is frozen. To unfreeze, users must "
            "complete a security verification including ID re-submission. Frozen account investigations are "
            "completed within 2 business days. During a freeze, incoming funds are accepted but all outgoing "
            "transactions are blocked."
        ),
    },
    {
        "title": "Withdrawal Limits and Processing",
        "category": "withdrawals",
        "content": (
            "Standard daily withdrawal limit is $10,000 for verified accounts. Withdrawals above the limit "
            "require additional identity verification. Processing time is 1-2 business days for domestic "
            "accounts and 3-5 for international. Withdrawal fees may apply for amounts below $50. Accounts "
            "under review or flagged for suspicious activity will have withdrawals temporarily suspended."
        ),
    },
    {
        "title": "Withdrawal Account Verification",
        "category": "withdrawals",
        "content": (
            "Bank accounts must be verified before the first withdrawal. Verification is done via "
            "micro-deposit or instant bank verification. Adding a new withdrawal destination triggers a "
            "24-hour security hold. Only accounts matching the name on your verified KYC profile are "
            "accepted. Withdrawals to unverified accounts will be returned automatically."
        ),
    },
]


async def seed_policy_documents(db: AsyncSession) -> None:
    result = await db.execute(select(func.count()).select_from(PolicyDocument))
    count = result.scalar()
    if count > 0:
        logger.info("Policy documents already seeded (%d records), skipping.", count)
        return

    logger.info("Seeding %d policy documents...", len(_POLICY_DOCUMENTS))
    for doc_data in _POLICY_DOCUMENTS:
        embedding = await embed_text(doc_data["content"])
        db.add(
            PolicyDocument(
                title=doc_data["title"],
                category=doc_data["category"],
                content=doc_data["content"],
                embedding=embedding,
            )
        )

    await db.commit()
    logger.info("Policy document seeding complete.")
