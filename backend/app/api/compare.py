from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.career import Career
from app.schemas.compare import CompareRequest, CompareResponse
from app.services.compare import compare_careers

router = APIRouter()


@router.post("/compare", response_model=CompareResponse)
def compare(request: CompareRequest, db: Session = Depends(get_db)):
    careers = (
        db.query(Career).filter(Career.id.in_(request.career_ids)).all()
    )
    if len(careers) != len(request.career_ids):
        raise HTTPException(status_code=404, detail="One or more careers not found")
    result = compare_careers(careers)
    return CompareResponse(**result)
