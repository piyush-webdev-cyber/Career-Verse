from pydantic import BaseModel


class SimulateRequest(BaseModel):
    career_id: int
    num_simulations: int = 10000


class ProbabilityInsight(BaseModel):
    label: str
    probability: float


class SimulateResponse(BaseModel):
    simulation_id: int
    career_name: str
    num_simulations: int
    years: int
    mean_salary: float
    median_salary: float
    worst_case: float
    best_case: float
    std_deviation: float
    probabilities: dict[str, float]
    probability_insights: list[ProbabilityInsight]
    probability_disruption: float
    stability_score: float
    stability_level: str
    stability_explanation: str
    salary_distribution: list[dict]
    growth_curve: list[dict]
    radar_metrics: dict[str, float]
