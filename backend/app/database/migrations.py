from sqlalchemy import inspect, text

from app.database.database import engine


def run_migrations() -> None:
    """Lightweight schema updates for SQLite without Alembic."""
    inspector = inspect(engine)
    if "users" not in inspector.get_table_names():
        return

    columns = {col["name"] for col in inspector.get_columns("users")}
    if "password_hash" not in columns:
        with engine.begin() as conn:
            conn.execute(text("ALTER TABLE users ADD COLUMN password_hash VARCHAR(255)"))
