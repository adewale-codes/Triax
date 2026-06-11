web: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
worker: cd backend && celery -A worker.celery_app worker --loglevel=info
release: cd backend && alembic upgrade head
