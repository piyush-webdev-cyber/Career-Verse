from app.database.seed import CAREER_SEED_DATA


def _cosine_similarity(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = sum(x * x for x in a) ** 0.5
    norm_b = sum(x * x for x in b) ** 0.5
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


def _user_vector(responses: dict) -> list[float]:
    return [
        responses["interest_coding"],
        responses["interest_math"],
        responses["interest_biology"],
        responses["interest_business"],
        responses["interest_creativity"],
        responses["risk_tolerance"],
        responses["work_life_balance"],
        responses["remote_preference"],
        responses["leadership_interest"],
        min(responses["years_to_study"], 10),
    ]


def _career_vector(profile: dict) -> list[float]:
    return [
        profile["coding"],
        profile["math"],
        profile["biology"],
        profile["business"],
        profile["creativity"],
        profile["risk"],
        profile["wlb"],
        profile["remote"],
        profile["leadership"],
        min(profile["education"], 10),
    ]


def _generate_reasoning(responses: dict, profile: dict, career_name: str) -> str:
    reasons = []
    if responses["interest_coding"] >= 7 and profile["coding"] >= 7:
        reasons.append("strong alignment with your coding interests")
    if responses["interest_math"] >= 7 and profile["math"] >= 7:
        reasons.append("your mathematical aptitude matches this field")
    if responses["interest_biology"] >= 7 and profile["biology"] >= 7:
        reasons.append("your biology interest fits this career path")
    if responses["interest_business"] >= 7 and profile["business"] >= 7:
        reasons.append("your business acumen is well-suited here")
    if responses["interest_creativity"] >= 7 and profile["creativity"] >= 7:
        reasons.append("your creative strengths align with role demands")
    if responses["risk_tolerance"] >= 7 and profile["risk"] >= 7:
        reasons.append("your risk tolerance matches this career's volatility profile")
    if responses["work_life_balance"] >= 7 and profile["wlb"] >= 6:
        reasons.append("offers work-life balance aligned with your preferences")
    if responses["remote_preference"] >= 7 and profile["remote"] >= 7:
        reasons.append("strong remote work opportunities match your preference")
    if responses["leadership_interest"] >= 7 and profile["leadership"] >= 7:
        reasons.append("leadership pathways align with your ambitions")
    if abs(responses["years_to_study"] - profile["education"]) <= 2:
        reasons.append("education timeline fits your study commitment")

    if not reasons:
        reasons.append(f"overall profile compatibility with {career_name} requirements")

    return "Recommended because of " + ", ".join(reasons[:3]) + "."


def get_recommendations(responses: dict) -> list[dict]:
    user_vec = _user_vector(responses)
    results = []

    for data in CAREER_SEED_DATA:
        profile = data["profile"]
        career_vec = _career_vector(profile)
        similarity = _cosine_similarity(user_vec, career_vec)
        match_pct = round(similarity * 100, 1)

        education_penalty = 0
        if responses["years_to_study"] < profile["education"] - 2:
            education_penalty = 0.15
        match_pct = max(0, match_pct - education_penalty * 100)

        results.append({
            "career_name": data["name"],
            "match_percentage": round(match_pct, 1),
            "reasoning": _generate_reasoning(responses, profile, data["name"]),
            "avg_starting_salary": data["avg_starting_salary"],
            "education_years": data["education_years"],
        })

    results.sort(key=lambda x: x["match_percentage"], reverse=True)
    return results[:5]
