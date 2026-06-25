import numpy as np
from typing import Any

NUM_SIMULATIONS = 10_000
SIMULATION_YEARS = 15
MILESTONES = {
    "10L": 10.0,
    "20L": 20.0,
    "50L": 50.0,
    "1Cr": 100.0,
    "25L": 25.0,
}


def run_monte_carlo(
    starting_salary: float,
    salary_growth: float,
    promotion_rate: float,
    layoff_risk: float,
    industry_growth: float,
    automation_risk: float,
    num_simulations: int = NUM_SIMULATIONS,
    years: int = SIMULATION_YEARS,
) -> dict[str, Any]:
    rng = np.random.default_rng()

    final_salaries = np.zeros(num_simulations)
    yearly_paths = np.zeros((num_simulations, years))
    disruption_events = np.zeros(num_simulations, dtype=bool)
    milestone_year_hits = {k: np.zeros(num_simulations, dtype=bool) for k in MILESTONES}

    for sim in range(num_simulations):
        salary = starting_salary
        disrupted = False
        disruption_year = -1

        for year in range(years):
            recession = rng.random() < 0.08
            recession_factor = 0.85 if recession else 1.0

            growth_noise = rng.normal(salary_growth, 0.04)
            industry_factor = 1.0 + rng.normal(industry_growth * 0.3, 0.02)

            if rng.random() < promotion_rate:
                growth_noise += 0.08

            if rng.random() < layoff_risk:
                salary *= 0.7
                if rng.random() < 0.3:
                    disrupted = True
                    disruption_year = year

            ai_impact = automation_risk * (year / years) * 0.15
            if rng.random() < ai_impact:
                growth_noise -= 0.03

            salary *= (1 + growth_noise) * recession_factor * industry_factor
            salary = max(salary, starting_salary * 0.5)
            yearly_paths[sim, year] = salary

            for key, threshold in MILESTONES.items():
                if salary >= threshold:
                    milestone_year_hits[key][sim] = True

        final_salaries[sim] = salary
        disruption_events[sim] = disrupted

    probabilities = {
        key: float(np.mean(hits) * 100)
        for key, hits in milestone_year_hits.items()
    }

    year_10_idx = min(9, years - 1)
    salaries_at_10 = yearly_paths[:, year_10_idx]

    histogram_bins = _build_histogram(final_salaries)

    return {
        "num_simulations": num_simulations,
        "years": years,
        "mean_salary": float(np.mean(final_salaries)),
        "median_salary": float(np.median(final_salaries)),
        "worst_case": float(np.percentile(final_salaries, 5)),
        "best_case": float(np.percentile(final_salaries, 95)),
        "std_deviation": float(np.std(final_salaries)),
        "probabilities": probabilities,
        "probability_disruption": float(np.mean(disruption_events) * 100),
        "probability_25L_10yr": float(np.mean(salaries_at_10 >= 25.0) * 100),
        "salary_distribution": histogram_bins,
        "growth_curve": _build_growth_curve(yearly_paths),
        "final_salaries_sample": final_salaries[:200].tolist(),
        "yearly_percentiles": _yearly_percentiles(yearly_paths),
    }


def _build_histogram(salaries: np.ndarray, bins: int = 30) -> list[dict]:
    counts, edges = np.histogram(salaries, bins=bins)
    return [
        {
            "range_start": float(edges[i]),
            "range_end": float(edges[i + 1]),
            "count": int(counts[i]),
            "label": f"₹{edges[i]:.0f}L–₹{edges[i+1]:.0f}L",
        }
        for i in range(len(counts))
    ]


def _build_growth_curve(yearly_paths: np.ndarray) -> list[dict]:
    years = yearly_paths.shape[1]
    return [
        {
            "year": year + 1,
            "p10": float(np.percentile(yearly_paths[:, year], 10)),
            "p25": float(np.percentile(yearly_paths[:, year], 25)),
            "p50": float(np.percentile(yearly_paths[:, year], 50)),
            "p75": float(np.percentile(yearly_paths[:, year], 75)),
            "p90": float(np.percentile(yearly_paths[:, year], 90)),
            "mean": float(np.mean(yearly_paths[:, year])),
        }
        for year in range(years)
    ]


def _yearly_percentiles(yearly_paths: np.ndarray) -> list[dict]:
    return _build_growth_curve(yearly_paths)
