"""add AI fields and policy_documents table

Revision ID: 002
Revises: 001
Create Date: 2026-05-17 00:00:00.000000

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects.postgresql import JSONB, UUID

revision: str = "002"
down_revision: Union[str, None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("CREATE EXTENSION IF NOT EXISTS vector")

    op.add_column("tickets", sa.Column("issue_type", sa.String(100), nullable=True))
    op.add_column("tickets", sa.Column("urgency_score", sa.Integer(), nullable=True))
    op.add_column("tickets", sa.Column("suggested_reply", sa.Text(), nullable=True))
    op.add_column(
        "tickets",
        sa.Column("processing_status", sa.String(50), nullable=True, server_default="pending"),
    )
    op.add_column("tickets", sa.Column("explanation", sa.Text(), nullable=True))
    op.add_column("tickets", sa.Column("relevant_docs", JSONB(), nullable=True))

    op.execute("""
        CREATE TABLE IF NOT EXISTS policy_documents (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title VARCHAR(255) NOT NULL,
            content TEXT,
            category VARCHAR(100),
            embedding vector(1536)
        )
    """)


def downgrade() -> None:
    op.drop_table("policy_documents")
    op.drop_column("tickets", "relevant_docs")
    op.drop_column("tickets", "explanation")
    op.drop_column("tickets", "processing_status")
    op.drop_column("tickets", "suggested_reply")
    op.drop_column("tickets", "urgency_score")
    op.drop_column("tickets", "issue_type")
