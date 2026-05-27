"""update embedding column from vector(1536) to vector(768)

Revision ID: 003
Revises: 002
Create Date: 2026-05-27 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op

revision: str = "003"
down_revision: Union[str, None] = "002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("ALTER TABLE policy_documents ALTER COLUMN embedding TYPE vector(768)")


def downgrade() -> None:
    op.execute("ALTER TABLE policy_documents ALTER COLUMN embedding TYPE vector(1536)")
