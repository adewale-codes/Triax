import logging
import os

from celery import Celery

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
    return {"status": "queued", "ticket_id": ticket_id}
