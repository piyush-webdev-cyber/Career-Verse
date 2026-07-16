import type { CompareCareer, CompareResponse } from '../types';
import type { CompareCareerOption } from '../data/careers';

function stabilityLevel(score: number): string {
  if (score >= 75) return 'High Stability';
  if (score >= 50) return 'Moderate Stability';
  return 'Low Stability';
}

function toCompareCareer(option: CompareCareerOption): CompareCareer {
  const growth = option.growthRate ?? 0.1;
  const demand = option.demand ?? 70;
  const aiRisk = option.aiRisk ?? 0.3;
  const stress = option.stress ?? 6;
  const flexibility = option.flexibility ?? 6;
  const remote = option.remote ?? 5;
  const industryGrowth = growth;

  const automationResistance = (1 - aiRisk) * 100;
  const industryGrowthScaled = Math.min(industryGrowth * 100, 100);
  const stabilityScore = Math.max(
    0,
    Math.min(100, 0.4 * demand + 0.3 * industryGrowthScaled + 0.3 * automationResistance)
  );

  const avgEarnings = Math.round(option.averageSalary * Math.pow(1 + growth, 10) * 10) / 10;

  return {
    id: option.id,
    name: option.name,
    avg_starting_salary: option.averageSalary,
    avg_earnings_projection: avgEarnings,
    stability_score: Math.round(stabilityScore * 10) / 10,
    stability_level: stabilityLevel(stabilityScore),
    ai_risk: Math.round(aiRisk * 1000) / 10,
    ai_resistance: Math.round((1 - aiRisk) * 1000) / 10,
    stress,
    growth: Math.round(industryGrowth * 1000) / 10,
    flexibility,
    remote_opportunity: remote,
    demand_score: demand,
    education_years: option.educationYears,
    radar: {
      salary_potential: Math.min(option.averageSalary * 5, 100),
      stability: Math.round(stabilityScore * 10) / 10,
      ai_resistance: Math.round((1 - aiRisk) * 1000) / 10,
      growth: Math.min(industryGrowth * 200, 100),
      flexibility: flexibility * 10,
      work_life_balance: Math.max(0, (10 - stress) * 10),
    },
  };
}

export function compareCareerOptions(options: CompareCareerOption[]): CompareResponse {
  const careers = options.map(toCompareCareer);
  if (careers.length === 0) {
    return { careers: [], summary: {} };
  }

  const bestEarnings = careers.reduce((a, b) =>
    a.avg_earnings_projection >= b.avg_earnings_projection ? a : b
  );
  const mostStable = careers.reduce((a, b) =>
    a.stability_score >= b.stability_score ? a : b
  );
  const lowestAi = careers.reduce((a, b) => (a.ai_risk <= b.ai_risk ? a : b));

  return {
    careers,
    summary: {
      highest_earnings: bestEarnings.name,
      most_stable: mostStable.name,
      lowest_ai_risk: lowestAi.name,
    },
  };
}
