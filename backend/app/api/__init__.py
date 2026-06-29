from fastapi import APIRouter
from app.api import careers, recommend, simulate, compare, dashboard, auth

router = APIRouter()
router.include_router(auth.router)
router.include_router(careers.router, tags=["careers"])
router.include_router(recommend.router, tags=["recommend"])
router.include_router(simulate.router, tags=["simulate"])
router.include_router(compare.router, tags=["compare"])
router.include_router(dashboard.router, tags=["dashboard"])
