export interface Career {
  id: number;
  name: string;
  avg_starting_salary: number;
  avg_salary_growth: number;
  industry_growth: number;
  stress_score: number;
  flexibility_score: number;
  remote_score: number;
  automation_risk: number;
  education_years: number;
  promotion_rate: number;
  layoff_risk: number;
  demand_score: number;
  description: string;
  recommended_skills: string;
}

export interface QuestionnaireData {
  interest_coding: number;
  interest_math: number;
  interest_biology: number;
  interest_business: number;
  interest_creativity: number;
  risk_tolerance: number;
  work_life_balance: number;
  remote_preference: number;
  leadership_interest: number;
  years_to_study: number;
}

export interface CareerMatch {
  career_name: string;
  match_percentage: number;
  reasoning: string;
  avg_starting_salary: number;
  education_years: number;
}

export interface RecommendResponse {
  user_id: number;
  matches: CareerMatch[];
}

export interface SalaryDistributionBin {
  range_start: number;
  range_end: number;
  count: number;
  label: string;
}

export interface GrowthCurvePoint {
  year: number;
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
  mean: number;
}

export interface ProbabilityInsight {
  label: string;
  probability: number;
}

export interface SimulateResponse {
  simulation_id: number;
  career_name: string;
  num_simulations: number;
  years: number;
  mean_salary: number;
  median_salary: number;
  worst_case: number;
  best_case: number;
  std_deviation: number;
  probabilities: Record<string, number>;
  probability_insights: ProbabilityInsight[];
  probability_disruption: number;
  stability_score: number;
  stability_level: string;
  stability_explanation: string;
  salary_distribution: SalaryDistributionBin[];
  growth_curve: GrowthCurvePoint[];
  radar_metrics: Record<string, number>;
}

export interface CompareCareer {
  id: number;
  name: string;
  avg_starting_salary: number;
  avg_earnings_projection: number;
  stability_score: number;
  stability_level: string;
  ai_risk: number;
  ai_resistance: number;
  stress: number;
  growth: number;
  flexibility: number;
  remote_opportunity: number;
  demand_score: number;
  education_years: number;
  radar: Record<string, number>;
}

export interface CompareResponse {
  careers: CompareCareer[];
  summary: {
    highest_earnings?: string;
    most_stable?: string;
    lowest_ai_risk?: string;
  };
}

export interface AIDisruptionTimeline {
  year: number;
  automation_pct: number;
  exposure_risk: number;
}

export interface AIDisruptionResponse {
  career: string;
  timeline: AIDisruptionTimeline[];
  recommended_skills: string[];
  summary: string;
}

export interface DashboardResponse {
  user: { id: number; name: string; email: string };
  career_matches: CareerMatch[];
  simulations: SimulationSummary[];
  saved_reports_count: number;
}

export interface SimulationSummary {
  id: number;
  career_name: string;
  average_salary: number;
  best_case: number;
  worst_case: number;
  probability_10L: number;
  probability_20L: number;
  probability_50L: number;
  stability_score: number;
  created_at: string;
}

export interface StabilityResponse {
  stability_score: number;
  level: string;
  explanation: string;
  components: Record<string, number>;
}
