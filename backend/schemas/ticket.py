from datetime import datetime
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


class TicketListResponse(BaseModel):
    tickets: list[TicketResponse]
    total: int
