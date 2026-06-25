from pydantic import BaseModel, Field


class CompareRequest(BaseModel):
    career_ids: list[int] = Field(min_length=2, max_length=3)


class CompareResponse(BaseModel):
    careers: list[dict]
    summary: dict
