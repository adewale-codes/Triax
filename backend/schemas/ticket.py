from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from models.ticket import TicketStatus


class TicketCreate(BaseModel):
    title: str = Field(..., max_length=255)
    description: str | None = None


class TicketResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    title: str
    description: str | None
    status: TicketStatus
    created_at: datetime
    updated_at: datetime

    # AI pipeline fields
    issue_type: str | None = None
    urgency_score: int | None = None
    suggested_reply: str | None = None
    explanation: str | None = None
    relevant_docs: list[dict[str, Any]] | None = None
    processing_status: str | None = None


class TicketListResponse(BaseModel):
    tickets: list[TicketResponse]
    total: int
