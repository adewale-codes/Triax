import os
from unittest.mock import AsyncMock, patch

import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

# Set dummy env vars before any app module is imported so module-level
# clients (OpenAI, Celery, SQLAlchemy engine) are constructed without errors.
os.environ.setdefault("DATABASE_URL", "postgresql+asyncpg://triax:triax@localhost:5432/triax")
os.environ.setdefault("OPENAI_API_KEY", "test-key-not-real")
os.environ.setdefault("REDIS_URL", "redis://localhost:6379/0")

# Patch SQLite's type compiler to accept PostgreSQL-specific column types
# (JSONB → TEXT, UUID → CHAR(32)) so Base.metadata.create_all works with SQLite.
from sqlalchemy.dialects.sqlite.base import SQLiteTypeCompiler  # noqa: E402

if not hasattr(SQLiteTypeCompiler, "visit_JSONB"):
    SQLiteTypeCompiler.visit_JSONB = lambda self, type_, **kw: "TEXT"
if not hasattr(SQLiteTypeCompiler, "visit_UUID"):
    SQLiteTypeCompiler.visit_UUID = lambda self, type_, **kw: "CHAR(32)"

TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"


@pytest_asyncio.fixture
async def async_client():
    engine = create_async_engine(TEST_DATABASE_URL, echo=False)
    TestSession = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    from database import Base, get_db
    from models.ticket import Ticket  # noqa: F401 — registers Ticket with Base.metadata
    from main import app

    # Create only the tickets table; skip policy_documents (requires pgvector extension)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all, tables=[Ticket.__table__])

    async def override_get_db():
        async with TestSession() as session:
            yield session

    app.dependency_overrides[get_db] = override_get_db

    with (
        # Prevent startup seed from calling OpenAI
        patch("main.seed_policy_documents", new_callable=AsyncMock),
        # Prevent ticket creation from trying to reach Redis/Celery
        patch("routers.tickets.process_ticket"),
    ):
        async with AsyncClient(
            transport=ASGITransport(app=app),
            base_url="http://test",
        ) as client:
            yield client

    app.dependency_overrides.clear()

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all, tables=[Ticket.__table__])

    await engine.dispose()
