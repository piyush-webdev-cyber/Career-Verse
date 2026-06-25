from sqlalchemy import Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class Career(Base):
    __tablename__ = "careers"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    avg_starting_salary: Mapped[float] = mapped_column(Float)
    avg_salary_growth: Mapped[float] = mapped_column(Float)
    industry_growth: Mapped[float] = mapped_column(Float)
    stress_score: Mapped[float] = mapped_column(Float)
    flexibility_score: Mapped[float] = mapped_column(Float)
    remote_score: Mapped[float] = mapped_column(Float)
    automation_risk: Mapped[float] = mapped_column(Float)
    education_years: Mapped[int] = mapped_column(Integer)
    promotion_rate: Mapped[float] = mapped_column(Float)
    layoff_risk: Mapped[float] = mapped_column(Float)
    demand_score: Mapped[float] = mapped_column(Float)
    description: Mapped[str] = mapped_column(Text, default="")
    recommended_skills: Mapped[str] = mapped_column(Text, default="")

    simulations = relationship("Simulation", back_populates="career")
