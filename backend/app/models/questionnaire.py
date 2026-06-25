from datetime import datetime, timezone

from sqlalchemy import DateTime, Float, ForeignKey, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class QuestionnaireResponse(Base):
    __tablename__ = "questionnaire_responses"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    interest_coding: Mapped[int] = mapped_column(Integer)
    interest_math: Mapped[int] = mapped_column(Integer)
    interest_biology: Mapped[int] = mapped_column(Integer)
    interest_business: Mapped[int] = mapped_column(Integer)
    interest_creativity: Mapped[int] = mapped_column(Integer)
    risk_tolerance: Mapped[int] = mapped_column(Integer)
    work_life_balance: Mapped[int] = mapped_column(Integer)
    remote_preference: Mapped[int] = mapped_column(Integer)
    leadership_interest: Mapped[int] = mapped_column(Integer)
    years_to_study: Mapped[int] = mapped_column(Integer)
    top_matches_json: Mapped[str] = mapped_column(Text, default="[]")
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

    user = relationship("User", back_populates="questionnaire_responses")
