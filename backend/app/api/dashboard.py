import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.models.simulation import Simulation
from app.models.questionnaire import QuestionnaireResponse
from app.schemas.dashboard import DashboardResponse, SimulationSummary

router = APIRouter()


@router.get("/dashboard/{user_id}", response_model=DashboardResponse)
def get_dashboard(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    latest_questionnaire = (
        db.query(QuestionnaireResponse)
        .filter(QuestionnaireResponse.user_id == user_id)
        .order_by(QuestionnaireResponse.created_at.desc())
        .first()
    )

    career_matches = []
    if latest_questionnaire and latest_questionnaire.top_matches_json:
        career_matches = json.loads(latest_questionnaire.top_matches_json)

    simulations = (
        db.query(Simulation)
        .filter(Simulation.user_id == user_id)
        .order_by(Simulation.created_at.desc())
        .limit(10)
        .all()
    )

    sim_summaries = []
    for sim in simulations:
        career_name = sim.career.name if sim.career else "Unknown"
        sim_summaries.append(
            SimulationSummary(
                id=sim.id,
                career_name=career_name,
                average_salary=sim.average_salary,
                best_case=sim.best_case,
                worst_case=sim.worst_case,
                probability_10L=sim.probability_10L,
                probability_20L=sim.probability_20L,
                probability_50L=sim.probability_50L,
                stability_score=sim.stability_score,
                created_at=sim.created_at,
            )
        )

    return DashboardResponse(
        user={"id": user.id, "name": user.name, "email": user.email},
        career_matches=career_matches,
        simulations=sim_summaries,
        saved_reports_count=len(simulations),
    )
