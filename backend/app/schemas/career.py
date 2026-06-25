from pydantic import BaseModel


class CareerResponse(BaseModel):
    id: int
    name: str
    avg_starting_salary: float
    avg_salary_growth: float
    industry_growth: float
    stress_score: float
    flexibility_score: float
    remote_score: float
    automation_risk: float
    education_years: int
    promotion_rate: float
    layoff_risk: float
    demand_score: float
    description: str
    recommended_skills: str

    model_config = {"from_attributes": True}


class CareerListResponse(BaseModel):
    careers: list[CareerResponse]
    total: int
