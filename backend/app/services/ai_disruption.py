AI_DISRUPTION_TIMELINE = {
    "Software Engineer": [
        {"year": 2026, "automation_pct": 10, "exposure_risk": 15},
        {"year": 2028, "automation_pct": 18, "exposure_risk": 22},
        {"year": 2030, "automation_pct": 25, "exposure_risk": 30},
        {"year": 2035, "automation_pct": 45, "exposure_risk": 48},
        {"year": 2040, "automation_pct": 60, "exposure_risk": 62},
    ],
    "Data Scientist": [
        {"year": 2026, "automation_pct": 12, "exposure_risk": 18},
        {"year": 2028, "automation_pct": 22, "exposure_risk": 28},
        {"year": 2030, "automation_pct": 35, "exposure_risk": 40},
        {"year": 2035, "automation_pct": 50, "exposure_risk": 55},
        {"year": 2040, "automation_pct": 65, "exposure_risk": 70},
    ],
    "AI Engineer": [
        {"year": 2026, "automation_pct": 5, "exposure_risk": 8},
        {"year": 2028, "automation_pct": 8, "exposure_risk": 12},
        {"year": 2030, "automation_pct": 12, "exposure_risk": 18},
        {"year": 2035, "automation_pct": 20, "exposure_risk": 28},
        {"year": 2040, "automation_pct": 30, "exposure_risk": 38},
    ],
    "Doctor": [
        {"year": 2026, "automation_pct": 5, "exposure_risk": 8},
        {"year": 2028, "automation_pct": 8, "exposure_risk": 12},
        {"year": 2030, "automation_pct": 12, "exposure_risk": 15},
        {"year": 2035, "automation_pct": 18, "exposure_risk": 22},
        {"year": 2040, "automation_pct": 25, "exposure_risk": 30},
    ],
    "Chartered Accountant": [
        {"year": 2026, "automation_pct": 20, "exposure_risk": 30},
        {"year": 2028, "automation_pct": 30, "exposure_risk": 42},
        {"year": 2030, "automation_pct": 42, "exposure_risk": 55},
        {"year": 2035, "automation_pct": 60, "exposure_risk": 72},
        {"year": 2040, "automation_pct": 75, "exposure_risk": 85},
    ],
    "Lawyer": [
        {"year": 2026, "automation_pct": 15, "exposure_risk": 22},
        {"year": 2028, "automation_pct": 25, "exposure_risk": 35},
        {"year": 2030, "automation_pct": 35, "exposure_risk": 48},
        {"year": 2035, "automation_pct": 50, "exposure_risk": 62},
        {"year": 2040, "automation_pct": 65, "exposure_risk": 75},
    ],
    "Teacher": [
        {"year": 2026, "automation_pct": 8, "exposure_risk": 12},
        {"year": 2028, "automation_pct": 12, "exposure_risk": 18},
        {"year": 2030, "automation_pct": 18, "exposure_risk": 25},
        {"year": 2035, "automation_pct": 28, "exposure_risk": 38},
        {"year": 2040, "automation_pct": 38, "exposure_risk": 48},
    ],
    "Product Manager": [
        {"year": 2026, "automation_pct": 8, "exposure_risk": 12},
        {"year": 2028, "automation_pct": 14, "exposure_risk": 20},
        {"year": 2030, "automation_pct": 22, "exposure_risk": 30},
        {"year": 2035, "automation_pct": 35, "exposure_risk": 45},
        {"year": 2040, "automation_pct": 48, "exposure_risk": 58},
    ],
    "UX Designer": [
        {"year": 2026, "automation_pct": 12, "exposure_risk": 18},
        {"year": 2028, "automation_pct": 20, "exposure_risk": 28},
        {"year": 2030, "automation_pct": 30, "exposure_risk": 40},
        {"year": 2035, "automation_pct": 45, "exposure_risk": 55},
        {"year": 2040, "automation_pct": 58, "exposure_risk": 68},
    ],
    "Cybersecurity Engineer": [
        {"year": 2026, "automation_pct": 6, "exposure_risk": 10},
        {"year": 2028, "automation_pct": 10, "exposure_risk": 15},
        {"year": 2030, "automation_pct": 15, "exposure_risk": 22},
        {"year": 2035, "automation_pct": 22, "exposure_risk": 32},
        {"year": 2040, "automation_pct": 30, "exposure_risk": 42},
    ],
    "Entrepreneur": [
        {"year": 2026, "automation_pct": 10, "exposure_risk": 15},
        {"year": 2028, "automation_pct": 15, "exposure_risk": 22},
        {"year": 2030, "automation_pct": 22, "exposure_risk": 30},
        {"year": 2035, "automation_pct": 32, "exposure_risk": 42},
        {"year": 2040, "automation_pct": 42, "exposure_risk": 52},
    ],
}


def get_ai_disruption(career_name: str, recommended_skills: str = "") -> dict:
    timeline = AI_DISRUPTION_TIMELINE.get(career_name)
    if not timeline:
        base_risk = 0.35
        timeline = [
            {
                "year": y,
                "automation_pct": round(base_risk * 100 * (i + 1) / 5),
                "exposure_risk": round(base_risk * 100 * (i + 1.2) / 5),
            }
            for i, y in enumerate([2026, 2028, 2030, 2035, 2040])
        ]

    skills = [s.strip() for s in recommended_skills.split(",") if s.strip()]
    if not skills:
        skills = ["AI Tools", "Digital Literacy", "Continuous Learning", "Adaptability"]

    return {
        "career": career_name,
        "timeline": timeline,
        "recommended_skills": skills,
        "summary": (
            f"By 2040, an estimated {timeline[-1]['automation_pct']}% of routine tasks "
            f"in {career_name} roles may be automated. Proactive upskilling is essential."
        ),
    }
