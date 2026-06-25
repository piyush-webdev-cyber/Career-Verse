from datetime import datetime, timezone

from sqlalchemy import DateTime, Float, ForeignKey, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class Simulation(Base):
    __tablename__ = "simulations"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    career_id: Mapped[int] = mapped_column(ForeignKey("careers.id"))
    average_salary: Mapped[float] = mapped_column(Float)
    median_salary: Mapped[float] = mapped_column(Float, default=0.0)
    best_case: Mapped[float] = mapped_column(Float)
    worst_case: Mapped[float] = mapped_column(Float)
    std_deviation: Mapped[float] = mapped_column(Float, default=0.0)
    probability_10L: Mapped[float] = mapped_column(Float)
    probability_20L: Mapped[float] = mapped_column(Float)
    probability_50L: Mapped[float] = mapped_column(Float)
    probability_1Cr: Mapped[float] = mapped_column(Float, default=0.0)
    probability_disruption: Mapped[float] = mapped_column(Float, default=0.0)
    stability_score: Mapped[float] = mapped_column(Float, default=0.0)
    results_json: Mapped[str] = mapped_column(Text, default="{}")
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

    user = relationship("User", back_populates="simulations")
    career = relationship("Career", back_populates="simulations")
