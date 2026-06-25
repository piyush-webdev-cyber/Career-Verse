import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
} from 'lucide-react';
import { useCareers } from '../hooks/useCareers';
import { useSimulation } from '../hooks/useSimulation';
import { getAIDisruption } from '../services/api';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import StabilityMeter from '../components/StabilityMeter';
import LoadingSpinner from '../components/LoadingSpinner';
import SalaryHistogram from '../charts/SalaryHistogram';
import GrowthCurveChart from '../charts/GrowthCurveChart';
import RadarChartComponent from '../charts/RadarChart';
import ProbabilityChart from '../charts/ProbabilityChart';
import AITimelineChart from '../charts/AITimelineChart';

export default function SimulatorPage() {
  const { data: careers, isLoading: careersLoading } = useCareers();
  const { userId, lastSimulation, setLastSimulation, selectedCareerId, setSelectedCareerId } = useApp();
  const [careerId, setCareerId] = useState<number | null>(selectedCareerId);
  const simulation = useSimulation(userId);

  const selectedCareer = careers?.find((c) => c.id === careerId);

  const { data: aiData } = useQuery({
    queryKey: ['ai-disruption', selectedCareer?.name],
    queryFn: () => getAIDisruption(selectedCareer!.name),
    enabled: !!selectedCareer?.name,
  });

  useEffect(() => {
    if (selectedCareerId && !careerId) setCareerId(selectedCareerId);
  }, [selectedCareerId, careerId]);

  const handleSimulate = () => {
    if (!careerId) return;
    setSelectedCareerId(careerId);
    simulation.mutate(careerId, {
      onSuccess: (data) => setLastSimulation(data),
    });
  };

  const result = simulation.data ?? lastSimulation;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Monte Carlo Simulator
        </h1>
        <p className="text-slate-400">
          Run 10,000 probabilistic simulations over 15 years to model your career earnings.
        </p>
      </div>

      <div className="glass-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={careerId ?? ''}
            onChange={(e) => setCareerId(Number(e.target.value))}
            className="flex-1 bg-slate-800/80 border border-surface-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            disabled={careersLoading}
          >
            <option value="">Select a career path...</option>
            {careers?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} (₹{c.avg_starting_salary}L starting)
              </option>
            ))}
          </select>
          <button
            onClick={handleSimulate}
            disabled={!careerId || simulation.isPending}
            className="btn-primary whitespace-nowrap"
          >
            {simulation.isPending ? 'Simulating...' : 'Run 10,000 Simulations'}
          </button>
        </div>
      </div>

      {simulation.isPending && <LoadingSpinner />}

      {simulation.isError && (
        <div className="glass-card p-4 border-red-500/30 text-red-400 text-sm">
          Simulation failed. Ensure the backend is running.
        </div>
      )}

      {result && !simulation.isPending && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <h2 className="font-display text-xl font-semibold text-white">
              {result.career_name}
            </h2>
            <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
              {result.num_simulations.toLocaleString()} simulations &times; {result.years} years
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Mean Salary"
              value={`₹${result.mean_salary.toFixed(1)}L`}
              icon={TrendingUp}
              color="text-emerald-400"
              delay={0}
            />
            <StatCard
              label="Median Salary"
              value={`₹${result.median_salary.toFixed(1)}L`}
              icon={Activity}
              color="text-indigo-400"
              delay={0.1}
            />
            <StatCard
              label="Best Case (95th)"
              value={`₹${result.best_case.toFixed(1)}L`}
              icon={Target}
              color="text-amber-400"
              delay={0.2}
            />
            <StatCard
              label="Worst Case (5th)"
              value={`₹${result.worst_case.toFixed(1)}L`}
              icon={TrendingDown}
              color="text-red-400"
              delay={0.3}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-white mb-4">
                Salary Distribution
              </h3>
              <SalaryHistogram data={result.salary_distribution} />
            </div>
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-white mb-4">
                Salary Growth Curve
              </h3>
              <GrowthCurveChart data={result.growth_curve} />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <StabilityMeter
              score={result.stability_score}
              level={result.stability_level}
              explanation={result.stability_explanation}
            />
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-white mb-4">
                Risk vs Reward
              </h3>
              <RadarChartComponent
                metrics={result.radar_metrics}
                name={result.career_name}
              />
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-display font-semibold text-white mb-2">
              Probability Analytics
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              All probabilities derived from {result.num_simulations.toLocaleString()} Monte Carlo simulation runs.
            </p>
            <ProbabilityChart insights={result.probability_insights} />
          </div>

          {aiData && (
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-white mb-2">
                AI Disruption Timeline
              </h3>
              <p className="text-sm text-slate-400 mb-4">{aiData.summary}</p>
              <AITimelineChart data={aiData.timeline} />
              <div className="mt-4 flex flex-wrap gap-2">
                {aiData.recommended_skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
