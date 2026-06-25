from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import router
from app.config import settings
from app.database.database import engine, Base, SessionLocal
from app.database.seed import seed_database


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    yield


app = FastAPI(
    title="CareerVerse AI",
    description="Career Risk & Reward Simulator API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "name": "CareerVerse AI",
        "tagline": "Simulate Your Future Before You Choose It.",
        "version": "1.0.0",
        "frontend": settings.frontend_url,
        "docs": "/docs",
    }


@app.get("/health")
def health():
    return {"status": "healthy"}
