import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.career import Career
from app.models.simulation import Simulation
from app.schemas.simulate import SimulateRequest, SimulateResponse, ProbabilityInsight
from app.simulation.monte_carlo import run_monte_carlo
from app.services.stability import calculate_stability_score

router = APIRouter()


@router.post("/simulate", response_model=SimulateResponse)
def run_simulation(request: SimulateRequest, db: Session = Depends(get_db)):
    career = db.query(Career).filter(Career.id == request.career_id).first()
    if not career:
        raise HTTPException(status_code=404, detail="Career not found")

    results = run_monte_carlo(
        starting_salary=career.avg_starting_salary,
        salary_growth=career.avg_salary_growth,
        promotion_rate=career.promotion_rate,
        layoff_risk=career.layoff_risk,
        industry_growth=career.industry_growth,
        automation_risk=career.automation_risk,
        num_simulations=request.num_simulations,
    )

    stability = calculate_stability_score(
        career.demand_score, career.industry_growth, career.automation_risk
    )

    probs = results["probabilities"]
    insights = [
        ProbabilityInsight(
            label=f"Probability of earning more than ₹10 LPA within {results['years']} years",
            probability=probs.get("10L", 0),
        ),
        ProbabilityInsight(
            label=f"Probability of earning more than ₹20 LPA within {results['years']} years",
            probability=probs.get("20L", 0),
        ),
        ProbabilityInsight(
            label=f"Probability of earning more than ₹25 LPA within 10 years",
            probability=results["probability_25L_10yr"],
        ),
        ProbabilityInsight(
            label=f"Probability of earning more than ₹50 LPA within {results['years']} years",
            probability=probs.get("50L", 0),
        ),
        ProbabilityInsight(
            label=f"Probability of earning more than ₹1 Crore within {results['years']} years",
            probability=probs.get("1Cr", 0),
        ),
        ProbabilityInsight(
            label="Probability of experiencing major career disruption",
            probability=results["probability_disruption"],
        ),
    ]

    radar_metrics = {
        "salary_potential": min(career.avg_starting_salary * 5, 100),
        "stability": stability["stability_score"],
        "ai_resistance": round((1 - career.automation_risk) * 100, 1),
        "growth": min(career.industry_growth * 200, 100),
        "flexibility": career.flexibility_score * 10,
        "work_life_balance": max(0, (10 - career.stress_score) * 10),
    }

    simulation = Simulation(
        user_id=request.user_id,
        career_id=career.id,
        average_salary=results["mean_salary"],
        median_salary=results["median_salary"],
        best_case=results["best_case"],
        worst_case=results["worst_case"],
        std_deviation=results["std_deviation"],
        probability_10L=probs.get("10L", 0),
        probability_20L=probs.get("20L", 0),
        probability_50L=probs.get("50L", 0),
        probability_1Cr=probs.get("1Cr", 0),
        probability_disruption=results["probability_disruption"],
        stability_score=stability["stability_score"],
        results_json=json.dumps(results),
    )
    db.add(simulation)
    db.commit()
    db.refresh(simulation)

    return SimulateResponse(
        simulation_id=simulation.id,
        career_name=career.name,
        num_simulations=results["num_simulations"],
        years=results["years"],
        mean_salary=results["mean_salary"],
        median_salary=results["median_salary"],
        worst_case=results["worst_case"],
        best_case=results["best_case"],
        std_deviation=results["std_deviation"],
        probabilities=probs,
        probability_insights=insights,
        probability_disruption=results["probability_disruption"],
        stability_score=stability["stability_score"],
        stability_level=stability["level"],
        stability_explanation=stability["explanation"],
        salary_distribution=results["salary_distribution"],
        growth_curve=results["growth_curve"],
        radar_metrics=radar_metrics,
    )
