import asyncio
import logging
import os

from celery import Celery
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

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
        database_url = os.environ.get("DATABASE_URL", "")
        if database_url.startswith("postgres://"):
            database_url = database_url.replace("postgres://", "postgresql+asyncpg://", 1)
        elif database_url.startswith("postgresql://"):
            database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
        engine = create_async_engine(database_url, echo=False)
        async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
        try:
            async with async_session() as db:
                from services.ai_pipeline import run_pipeline
                return await run_pipeline(db, ticket_id)
        finally:
            await engine.dispose()

    try:
        return asyncio.run(_run())
    except Exception:
        logger.exception("process_ticket failed for ticket %s", ticket_id)
        raise
