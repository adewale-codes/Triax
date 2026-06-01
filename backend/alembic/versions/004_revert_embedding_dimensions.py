"""revert embedding column from vector(768) to vector(1536)

Revision ID: 004
Revises: 003
Create Date: 2026-05-28 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op

revision: str = "004"
down_revision: Union[str, None] = "003"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("ALTER TABLE policy_documents ALTER COLUMN embedding TYPE vector(1536)")


def downgrade() -> None:
    op.execute("ALTER TABLE policy_documents ALTER COLUMN embedding TYPE vector(768)")
