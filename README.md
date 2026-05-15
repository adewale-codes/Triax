# Triax

AI-powered fintech support ticket triage system.

## Getting Started

1. Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

2. Start all services:

```bash
docker compose up
```

The API will be available at http://localhost:8000. Check the health endpoint:

```bash
curl http://localhost:8000/health
```

3. Run database migrations (first time or after schema changes):

```bash
docker compose exec api alembic upgrade head
```
# Triax
