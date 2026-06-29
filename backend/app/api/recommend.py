import json

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.models.questionnaire import QuestionnaireResponse
from app.schemas.recommend import RecommendRequest, RecommendResponse, CareerMatch
from app.services.recommendation import get_recommendations

router = APIRouter()


@router.post("/recommend", response_model=RecommendResponse)
def recommend_careers(
    request: RecommendRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    responses = request.model_dump()
    matches = get_recommendations(responses)

    questionnaire = QuestionnaireResponse(
        user_id=current_user.id,
        interest_coding=request.interest_coding,
        interest_math=request.interest_math,
        interest_biology=request.interest_biology,
        interest_business=request.interest_business,
        interest_creativity=request.interest_creativity,
        risk_tolerance=request.risk_tolerance,
        work_life_balance=request.work_life_balance,
        remote_preference=request.remote_preference,
        leadership_interest=request.leadership_interest,
        years_to_study=request.years_to_study,
        top_matches_json=json.dumps(matches),
    )
    db.add(questionnaire)
    db.commit()

    return RecommendResponse(
        user_id=current_user.id,
        matches=[CareerMatch(**m) for m in matches],
    )
