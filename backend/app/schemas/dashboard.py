from pydantic import BaseModel
from datetime import datetime


class SimulationSummary(BaseModel):
    id: int
    career_name: str
    average_salary: float
    best_case: float
    worst_case: float
    probability_10L: float
    probability_20L: float
    probability_50L: float
    stability_score: float
    created_at: datetime

    model_config = {"from_attributes": True}


class DashboardResponse(BaseModel):
    user: dict
    career_matches: list[dict]
    simulations: list[SimulationSummary]
    saved_reports_count: int
