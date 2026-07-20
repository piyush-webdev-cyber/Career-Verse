import type { SimulateResponse, SalaryDistributionBin, GrowthCurvePoint } from '../types';
import type { CompareCareerOption } from '../data/careers';

const SIMULATION_YEARS = 15;
const MILESTONES = {
  '10L': 10,
  '20L': 20,
  '50L': 50,
  '1Cr': 100,
  '25L': 25,
};

function randomNormal(mean: number, stdDev: number): number {
  const u1 = Math.max(Math.random(), Number.EPSILON);
  const u2 = Math.random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z0 * stdDev;
}

function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sorted[lower];
  const weight = index - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

function mean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function buildHistogram(values: number[], bins = 30): SalaryDistributionBin[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const width = Math.max((max - min) / bins, 1);
  const counts = Array.from({ length: bins }, () => 0);

  values.forEach((value) => {
    const index = Math.min(bins - 1, Math.floor((value - min) / width));
    counts[index] += 1;
  });

  return counts.map((count, index) => {
    const rangeStart = min + index * width;
    const rangeEnd = rangeStart + width;
    return {
      range_start: rangeStart,
      range_end: rangeEnd,
      count,
      label: `₹${rangeStart.toFixed(0)}L-₹${rangeEnd.toFixed(0)}L`,
    };
  });
}

function buildGrowthCurve(paths: number[][]): GrowthCurvePoint[] {
  return Array.from({ length: SIMULATION_YEARS }, (_, yearIndex) => {
    const values = paths.map((path) => path[yearIndex]);
    return {
      year: yearIndex + 1,
      p10: percentile(values, 10),
      p25: percentile(values, 25),
      p50: percentile(values, 50),
      p75: percentile(values, 75),
      p90: percentile(values, 90),
      mean: mean(values),
    };
  });
}

function stability(score: number): { level: string; explanation: string } {
  if (score >= 75) {
    return {
      level: 'High Stability',
      explanation:
        'Strong demand, growing industry, and high resistance to automation make this a relatively secure career path.',
    };
  }
  if (score >= 50) {
    return {
      level: 'Moderate Stability',
      explanation:
        'This career offers reasonable stability but faces some headwinds from market shifts or automation trends.',
    };
  }
  return {
    level: 'Low Stability',
    explanation:
      'Higher volatility expected due to automation risk, industry decline, or reduced demand. Consider upskilling strategically.',
  };
}

export function simulateCareerOption(
  career: CompareCareerOption,
  numSimulations = 10000
): SimulateResponse {
  const startingSalary = career.averageSalary;
  const salaryGrowth = career.growthRate ?? 0.1;
  const promotionRate = Math.min(0.2, Math.max(0.05, salaryGrowth));
  const layoffRisk = Math.max(0.02, Math.min(0.35, 0.18 - (career.demand ?? 70) / 1000));
  const industryGrowth = salaryGrowth;
  const automationRisk = career.aiRisk ?? 0.3;
  const demand = career.demand ?? 70;
  const stress = career.stress ?? 6;
  const flexibility = career.flexibility ?? 6;

  const finalSalaries: number[] = [];
  const yearlyPaths: number[][] = [];
  const disrupted: boolean[] = [];
  const milestoneHits: Record<keyof typeof MILESTONES, boolean[]> = {
    '10L': [],
    '20L': [],
    '50L': [],
    '1Cr': [],
    '25L': [],
  };

  for (let sim = 0; sim < numSimulations; sim += 1) {
    let salary = startingSalary;
    let hadDisruption = false;
    const path: number[] = [];

    for (let year = 0; year < SIMULATION_YEARS; year += 1) {
      const recessionFactor = Math.random() < 0.08 ? 0.85 : 1;
      let growthNoise = randomNormal(salaryGrowth, 0.04);
      const industryFactor = 1 + randomNormal(industryGrowth * 0.3, 0.02);

      if (Math.random() < promotionRate) growthNoise += 0.08;
      if (Math.random() < layoffRisk) {
        salary *= 0.7;
        if (Math.random() < 0.3) hadDisruption = true;
      }

      const aiImpact = automationRisk * (year / SIMULATION_YEARS) * 0.15;
      if (Math.random() < aiImpact) growthNoise -= 0.03;

      salary *= (1 + growthNoise) * recessionFactor * industryFactor;
      salary = Math.max(salary, startingSalary * 0.5);
      path.push(salary);

      Object.entries(MILESTONES).forEach(([key, threshold]) => {
        if (salary >= threshold) {
          milestoneHits[key as keyof typeof MILESTONES][sim] = true;
        }
      });
    }

    finalSalaries.push(salary);
    yearlyPaths.push(path);
    disrupted.push(hadDisruption);
  }

  const probabilities = Object.fromEntries(
    Object.keys(MILESTONES).map((key) => {
      const hits = milestoneHits[key as keyof typeof MILESTONES];
      const probability =
        (Array.from({ length: numSimulations }).filter((_, i) => hits[i]).length /
          numSimulations) *
        100;
      return [key, probability];
    })
  );

  const stabilityScore = Math.max(
    0,
    Math.min(100, 0.4 * demand + 0.3 * Math.min(industryGrowth * 100, 100) + 0.3 * (1 - automationRisk) * 100)
  );
  const stabilityMeta = stability(stabilityScore);
  const salariesAt10 = yearlyPaths.map((path) => path[9] ?? path[path.length - 1]);
  const probabilityDisruption =
    (disrupted.filter(Boolean).length / Math.max(disrupted.length, 1)) * 100;

  return {
    simulation_id: -career.id,
    career_name: career.name,
    num_simulations: numSimulations,
    years: SIMULATION_YEARS,
    mean_salary: mean(finalSalaries),
    median_salary: percentile(finalSalaries, 50),
    worst_case: percentile(finalSalaries, 5),
    best_case: percentile(finalSalaries, 95),
    std_deviation: Math.sqrt(
      mean(finalSalaries.map((value) => Math.pow(value - mean(finalSalaries), 2)))
    ),
    probabilities,
    probability_insights: [
      {
        label: `Probability of earning more than ₹10 LPA within ${SIMULATION_YEARS} years`,
        probability: probabilities['10L'] ?? 0,
      },
      {
        label: `Probability of earning more than ₹20 LPA within ${SIMULATION_YEARS} years`,
        probability: probabilities['20L'] ?? 0,
      },
      {
        label: 'Probability of earning more than ₹25 LPA within 10 years',
        probability:
          (salariesAt10.filter((value) => value >= MILESTONES['25L']).length /
            numSimulations) *
          100,
      },
      {
        label: `Probability of earning more than ₹50 LPA within ${SIMULATION_YEARS} years`,
        probability: probabilities['50L'] ?? 0,
      },
      {
        label: `Probability of earning more than ₹1 Crore within ${SIMULATION_YEARS} years`,
        probability: probabilities['1Cr'] ?? 0,
      },
      {
        label: 'Probability of experiencing major career disruption',
        probability: probabilityDisruption,
      },
    ],
    probability_disruption: probabilityDisruption,
    stability_score: Math.round(stabilityScore * 10) / 10,
    stability_level: stabilityMeta.level,
    stability_explanation: stabilityMeta.explanation,
    salary_distribution: buildHistogram(finalSalaries),
    growth_curve: buildGrowthCurve(yearlyPaths),
    radar_metrics: {
      salary_potential: Math.min(startingSalary * 5, 100),
      stability: Math.round(stabilityScore * 10) / 10,
      ai_resistance: Math.round((1 - automationRisk) * 1000) / 10,
      growth: Math.min(industryGrowth * 200, 100),
      flexibility: flexibility * 10,
      work_life_balance: Math.max(0, (10 - stress) * 10),
    },
  };
}
