import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { GitCompare, Trophy } from 'lucide-react';
import { useCareers } from '../hooks/useCareers';
import { compareCareers } from '../services/api';
import ParallelUniverseCard from '../components/ParallelUniverseCard';
import ComparisonBarChart from '../charts/ComparisonBarChart';
import RadarChartComponent from '../charts/RadarChart';
import LoadingSpinner from '../components/LoadingSpinner';

const COLORS = ['#818cf8', '#34d399', '#f472b6'];

export default function ParallelUniversePage() {
  const { data: careers, isLoading } = useCareers();
  const [selected, setSelected] = useState<number[]>([]);

  const mutation = useMutation({
    mutationFn: () => compareCareers(selected),
  });

  const toggleCareer = (id: number) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
    mutation.reset();
  };

  const handleCompare = () => {
    if (selected.length >= 2) mutation.mutate();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <GitCompare className="w-8 h-8 text-indigo-400" />
          Parallel Universe Simulator
        </h1>
        <p className="text-slate-400">
          Select 2–3 careers and explore alternate futures side-by-side.
        </p>
      </div>

      <div className="glass-card p-6">
        <p className="text-sm text-slate-400 mb-4">
          Selected: {selected.length}/3 careers
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {isLoading ? (
            <LoadingSpinner text="Loading careers..." />
          ) : (
            careers?.map((career) => {
              const isSelected = selected.includes(career.id);
              return (
                <button
                  key={career.id}
                  onClick={() => toggleCareer(career.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-indigo-500/15 border-indigo-500/40 text-white'
                      : 'bg-slate-800/40 border-surface-border text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <span className="font-medium text-sm">{career.name}</span>
                  <span className="block text-xs mt-1 opacity-70">
                    ₹{career.avg_starting_salary}L starting
                  </span>
                </button>
              );
            })
          )}
        </div>
        <button
          onClick={handleCompare}
          disabled={selected.length < 2 || mutation.isPending}
          className="btn-primary"
        >
          {mutation.isPending ? 'Comparing...' : 'Compare Universes'}
        </button>
      </div>

      {mutation.isPending && <LoadingSpinner text="Building parallel universe comparison..." />}

      {mutation.data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {mutation.data.summary && (
            <div className="glass-card p-5 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-slate-400">Highest Earnings:</span>
                <span className="text-white font-medium">{mutation.data.summary.highest_earnings}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">Most Stable:</span>
                <span className="text-white font-medium">{mutation.data.summary.most_stable}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">Lowest AI Risk:</span>
                <span className="text-white font-medium">{mutation.data.summary.lowest_ai_risk}</span>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mutation.data.careers.map((career, i) => (
              <ParallelUniverseCard key={career.id} career={career} index={i} />
            ))}
          </div>

          <div className="glass-card p-6">
            <h3 className="font-display font-semibold text-white mb-4">
              Multi-Metric Comparison
            </h3>
            <ComparisonBarChart careers={mutation.data.careers} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mutation.data.careers.map((career, i) => (
              <div key={career.id} className="glass-card p-6">
                <h4 className="font-display font-semibold text-white mb-4 text-center">
                  {career.name}
                </h4>
                <RadarChartComponent
                  metrics={career.radar}
                  color={COLORS[i]}
                  name={career.name}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
