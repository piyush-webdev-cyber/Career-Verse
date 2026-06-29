from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.database.database import get_db
from app.models.career import Career
from app.models.user import User
from app.schemas.career import CareerResponse, CareerListResponse
from app.services.ai_disruption import get_ai_disruption
from app.services.stability import calculate_stability_score

router = APIRouter()


@router.get("/careers", response_model=CareerListResponse)
def list_careers(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    careers = db.query(Career).order_by(Career.name).all()
    return CareerListResponse(careers=careers, total=len(careers))


@router.get("/career/{career_id}", response_model=CareerResponse)
def get_career(
    career_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    career = db.query(Career).filter(Career.id == career_id).first()
    if not career:
        raise HTTPException(status_code=404, detail="Career not found")
    return career


@router.get("/ai-disruption/{career_name}")
def ai_disruption(
    career_name: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    career = db.query(Career).filter(Career.name == career_name).first()
    skills = career.recommended_skills if career else ""
    return get_ai_disruption(career_name, skills)


@router.get("/career/{career_id}/stability")
def career_stability(
    career_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    career = db.query(Career).filter(Career.id == career_id).first()
    if not career:
        raise HTTPException(status_code=404, detail="Career not found")
    return calculate_stability_score(
        career.demand_score, career.industry_growth, career.automation_risk
    )
