import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI

from database import AsyncSessionLocal
from routers.tickets import router as tickets_router
from services.seed import seed_policy_documents

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        async with AsyncSessionLocal() as db:
            await seed_policy_documents(db)
    except Exception:
        logger.exception("Policy document seeding failed on startup")
    yield


app = FastAPI(title="Triax API", lifespan=lifespan)

app.include_router(tickets_router)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "triax-api"}
