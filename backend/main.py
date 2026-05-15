from fastapi import FastAPI

app = FastAPI(title="Triax API")


@app.get("/health")
async def health():
    return {"status": "ok", "service": "triax-api"}
