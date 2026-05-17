import enum
import uuid

from sqlalchemy import Column, DateTime, Enum, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID

from database import Base


class TicketStatus(enum.Enum):
    open = "open"
    in_progress = "in_progress"
    resolved = "resolved"


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(
        Enum(TicketStatus, name="ticketstatus"),
        nullable=False,
        default=TicketStatus.open,
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # AI pipeline fields
    issue_type = Column(String(100), nullable=True)
    urgency_score = Column(Integer, nullable=True)
    suggested_reply = Column(Text, nullable=True)
    processing_status = Column(String(50), nullable=True, default="pending")
    explanation = Column(Text, nullable=True)
    relevant_docs = Column(JSONB, nullable=True)
