import uuid


async def test_create_ticket_returns_201(async_client):
    response = await async_client.post(
        "/api/v1/tickets",
        json={"title": "Payment not received", "description": "Sent £200 three days ago."},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Payment not received"
    assert data["description"] == "Sent £200 three days ago."
    assert data["status"] == "open"
    assert "id" in data


async def test_create_ticket_missing_title_returns_422(async_client):
    response = await async_client.post("/api/v1/tickets", json={})
    assert response.status_code == 422


async def test_list_tickets_empty_db(async_client):
    response = await async_client.get("/api/v1/tickets")
    assert response.status_code == 200
    assert response.json() == {"tickets": [], "total": 0}


async def test_list_tickets_total_increments(async_client):
    await async_client.post("/api/v1/tickets", json={"title": "First ticket"})
    await async_client.post("/api/v1/tickets", json={"title": "Second ticket"})

    response = await async_client.get("/api/v1/tickets")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 2
    assert len(data["tickets"]) == 2


async def test_get_ticket_by_id(async_client):
    create = await async_client.post(
        "/api/v1/tickets", json={"title": "Findable ticket"}
    )
    ticket_id = create.json()["id"]

    response = await async_client.get(f"/api/v1/tickets/{ticket_id}")
    assert response.status_code == 200
    assert response.json()["id"] == ticket_id
    assert response.json()["title"] == "Findable ticket"


async def test_get_ticket_not_found_returns_404(async_client):
    response = await async_client.get(f"/api/v1/tickets/{uuid.uuid4()}")
    assert response.status_code == 404
