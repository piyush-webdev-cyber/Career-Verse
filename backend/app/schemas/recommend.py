from pydantic import BaseModel, Field


class RecommendRequest(BaseModel):
    interest_coding: int = Field(ge=0, le=10)
    interest_math: int = Field(ge=0, le=10)
    interest_biology: int = Field(ge=0, le=10)
    interest_business: int = Field(ge=0, le=10)
    interest_creativity: int = Field(ge=0, le=10)
    risk_tolerance: int = Field(ge=0, le=10)
    work_life_balance: int = Field(ge=0, le=10)
    remote_preference: int = Field(ge=0, le=10)
    leadership_interest: int = Field(ge=0, le=10)
    years_to_study: int = Field(ge=1, le=15)


class CareerMatch(BaseModel):
    career_name: str
    match_percentage: float
    reasoning: str
    avg_starting_salary: float
    education_years: int


class RecommendResponse(BaseModel):
    user_id: int
    matches: list[CareerMatch]
