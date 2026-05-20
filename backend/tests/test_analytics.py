REQUIRED_KEYS = {
    "total_tickets",
    "avg_urgency_score",
    "completion_rate",
    "failed_count",
    "by_issue_type",
    "by_urgency",
    "by_processing_status",
    "by_status",
    "volume_over_time",
}


async def test_analytics_returns_200(async_client):
    response = await async_client.get("/api/v1/analytics")
    assert response.status_code == 200


async def test_analytics_contains_required_keys(async_client):
    response = await async_client.get("/api/v1/analytics")
    assert REQUIRED_KEYS.issubset(response.json().keys())


async def test_analytics_total_tickets_zero_on_empty_db(async_client):
    response = await async_client.get("/api/v1/analytics")
    assert response.json()["total_tickets"] == 0


async def test_analytics_total_tickets_after_create(async_client):
    await async_client.post("/api/v1/tickets", json={"title": "Analytics smoke test"})

    response = await async_client.get("/api/v1/analytics")
    assert response.status_code == 200
    assert response.json()["total_tickets"] == 1
