from app.models.career import Career
from app.services.stability import calculate_stability_score


def compare_careers(careers: list[Career]) -> dict:
    comparisons = []
    for career in careers:
        stability = calculate_stability_score(
            career.demand_score,
            career.industry_growth,
            career.automation_risk,
        )
        comparisons.append({
            "id": career.id,
            "name": career.name,
            "avg_starting_salary": career.avg_starting_salary,
            "avg_earnings_projection": round(
                career.avg_starting_salary
                * (1 + career.avg_salary_growth) ** 10,
                1,
            ),
            "stability_score": stability["stability_score"],
            "stability_level": stability["level"],
            "ai_risk": round(career.automation_risk * 100, 1),
            "ai_resistance": round((1 - career.automation_risk) * 100, 1),
            "stress": career.stress_score,
            "growth": round(career.industry_growth * 100, 1),
            "flexibility": career.flexibility_score,
            "remote_opportunity": career.remote_score,
            "demand_score": career.demand_score,
            "education_years": career.education_years,
            "radar": {
                "salary_potential": min(career.avg_starting_salary * 5, 100),
                "stability": stability["stability_score"],
                "ai_resistance": round((1 - career.automation_risk) * 100, 1),
                "growth": min(career.industry_growth * 200, 100),
                "flexibility": career.flexibility_score * 10,
                "work_life_balance": max(0, (10 - career.stress_score) * 10),
            },
        })

    return {
        "careers": comparisons,
        "summary": _comparison_summary(comparisons),
    }


def _comparison_summary(comparisons: list[dict]) -> dict:
    if not comparisons:
        return {}
    best_earnings = max(comparisons, key=lambda c: c["avg_earnings_projection"])
    best_stability = max(comparisons, key=lambda c: c["stability_score"])
    lowest_ai_risk = min(comparisons, key=lambda c: c["ai_risk"])
    return {
        "highest_earnings": best_earnings["name"],
        "most_stable": best_stability["name"],
        "lowest_ai_risk": lowest_ai_risk["name"],
    }
