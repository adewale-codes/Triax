from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import Date, cast, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models.ticket import Ticket

router = APIRouter(prefix="/api/v1/analytics", tags=["analytics"])


class IssueTypeCount(BaseModel):
    issue_type: str
    count: int


class UrgencyCount(BaseModel):
    urgency_score: int
    count: int


class ProcessingStatusCount(BaseModel):
    processing_status: str
    count: int


class StatusCount(BaseModel):
    status: str
    count: int


class VolumePoint(BaseModel):
    date: str
    count: int


class AnalyticsResponse(BaseModel):
    total_tickets: int
    avg_urgency_score: float | None
    completion_rate: float
    failed_count: int
    by_issue_type: list[IssueTypeCount]
    by_urgency: list[UrgencyCount]
    by_processing_status: list[ProcessingStatusCount]
    by_status: list[StatusCount]
    volume_over_time: list[VolumePoint]


@router.get("", response_model=AnalyticsResponse)
async def get_analytics(db: AsyncSession = Depends(get_db)):
    # Total tickets
    total_result = await db.execute(select(func.count()).select_from(Ticket))
    total_tickets = total_result.scalar() or 0

    # Average urgency score (NULL rows excluded automatically by func.avg)
    avg_result = await db.execute(select(func.avg(Ticket.urgency_score)))
    avg_raw = avg_result.scalar()
    avg_urgency_score = round(float(avg_raw), 1) if avg_raw is not None else None

    # Processing status breakdown — used for completion_rate, failed_count, and by_processing_status
    proc_result = await db.execute(
        select(Ticket.processing_status, func.count().label("count"))
        .where(Ticket.processing_status.isnot(None))
        .group_by(Ticket.processing_status)
    )
    proc_rows = proc_result.all()
    proc_map = {row.processing_status: row.count for row in proc_rows}

    completed_count = proc_map.get("completed", 0)
    failed_count = proc_map.get("failed", 0)
    completion_rate = (
        round(completed_count / total_tickets * 100, 1) if total_tickets > 0 else 0.0
    )
    by_processing_status = [
        ProcessingStatusCount(processing_status=status, count=count)
        for status, count in proc_map.items()
    ]

    # By issue type
    issue_result = await db.execute(
        select(Ticket.issue_type, func.count().label("count"))
        .where(Ticket.issue_type.isnot(None))
        .group_by(Ticket.issue_type)
        .order_by(func.count().desc())
    )
    by_issue_type = [
        IssueTypeCount(issue_type=row.issue_type, count=row.count)
        for row in issue_result.all()
    ]

    # By urgency score
    urgency_result = await db.execute(
        select(Ticket.urgency_score, func.count().label("count"))
        .where(Ticket.urgency_score.isnot(None))
        .group_by(Ticket.urgency_score)
        .order_by(Ticket.urgency_score)
    )
    by_urgency = [
        UrgencyCount(urgency_score=row.urgency_score, count=row.count)
        for row in urgency_result.all()
    ]

    # By ticket status (enum → string via .value)
    status_result = await db.execute(
        select(Ticket.status, func.count().label("count")).group_by(Ticket.status)
    )
    by_status = [
        StatusCount(
            status=row.status.value if hasattr(row.status, "value") else str(row.status),
            count=row.count,
        )
        for row in status_result.all()
    ]

    # Volume over last 30 days grouped by calendar date
    thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)
    volume_result = await db.execute(
        select(
            cast(Ticket.created_at, Date).label("date"),
            func.count().label("count"),
        )
        .where(Ticket.created_at >= thirty_days_ago)
        .group_by(cast(Ticket.created_at, Date))
        .order_by(cast(Ticket.created_at, Date))
    )
    volume_over_time = [
        VolumePoint(date=str(row.date), count=row.count)
        for row in volume_result.all()
    ]

    return AnalyticsResponse(
        total_tickets=total_tickets,
        avg_urgency_score=avg_urgency_score,
        completion_rate=completion_rate,
        failed_count=failed_count,
        by_issue_type=by_issue_type,
        by_urgency=by_urgency,
        by_processing_status=by_processing_status,
        by_status=by_status,
        volume_over_time=volume_over_time,
    )
