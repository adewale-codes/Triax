import asyncio
import logging
import os

from celery import Celery

from database import AsyncSessionLocal
from services.ai_pipeline import run_pipeline

logger = logging.getLogger(__name__)

redis_url = os.environ.get("REDIS_URL", "redis://redis:6379/0")

celery_app = Celery(
    "triax",
    broker=redis_url,
    backend=redis_url,
)


@celery_app.task
def process_ticket(ticket_id: str) -> dict:
    logger.info("Processing ticket %s", ticket_id)

    async def _run() -> dict:
        async with AsyncSessionLocal() as db:
            return await run_pipeline(db, ticket_id)

    return asyncio.run(_run())
