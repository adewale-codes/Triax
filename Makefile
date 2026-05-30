.PHONY: up down down-v migrate test logs logs-worker ps pull-models

up:
	docker compose up --build -d

down:
	docker compose down

down-v:
	docker compose down -v

migrate:
	docker compose exec api alembic upgrade head

test:
	docker compose exec api pytest tests/ -v

logs:
	docker compose logs -f

logs-worker:
	docker compose logs -f worker

ps:
	docker compose ps

pull-models:
	docker compose exec ollama ollama pull llama3.2:3b
	docker compose exec ollama ollama pull nomic-embed-text
