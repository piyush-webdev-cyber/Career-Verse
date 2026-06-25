def calculate_stability_score(
    demand_score: float,
    industry_growth: float,
    automation_risk: float,
) -> dict:
    automation_resistance = (1.0 - automation_risk) * 100
    industry_growth_scaled = min(industry_growth * 100, 100)

    score = (
        0.4 * demand_score
        + 0.3 * industry_growth_scaled
        + 0.3 * automation_resistance
    )
    score = max(0.0, min(100.0, score))

    if score >= 75:
        level = "High Stability"
        explanation = (
            "Strong demand, growing industry, and high resistance to automation "
            "make this a relatively secure career path."
        )
    elif score >= 50:
        level = "Moderate Stability"
        explanation = (
            "This career offers reasonable stability but faces some headwinds "
            "from market shifts or automation trends."
        )
    else:
        level = "Low Stability"
        explanation = (
            "Higher volatility expected due to automation risk, industry decline, "
            "or reduced demand. Consider upskilling strategically."
        )

    return {
        "stability_score": round(score, 1),
        "level": level,
        "explanation": explanation,
        "components": {
            "demand_contribution": round(0.4 * demand_score, 1),
            "growth_contribution": round(0.3 * industry_growth_scaled, 1),
            "automation_resistance_contribution": round(0.3 * automation_resistance, 1),
        },
    }
