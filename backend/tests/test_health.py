async def test_health_returns_200(async_client):
    response = await async_client.get("/health")
    assert response.status_code == 200


async def test_health_response_body(async_client):
    response = await async_client.get("/health")
    assert response.json() == {"status": "ok", "service": "triax-api"}
