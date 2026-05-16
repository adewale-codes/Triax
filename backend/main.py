from fastapi import FastAPI

from routers.tickets import router as tickets_router

app = FastAPI(title="Triax API")

app.include_router(tickets_router)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "triax-api"}
