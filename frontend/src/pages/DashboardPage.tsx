import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { User, FileText, BarChart3, Brain } from 'lucide-react';
import { getDashboard } from '../services/api';
import { useApp } from '../context/AppContext';
import CareerCard from '../components/CareerCard';
import LoadingSpinner from '../components/LoadingSpinner';
import StatCard from '../components/StatCard';

export default function DashboardPage() {
  const { userId, matches } = useApp();

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard', userId],
    queryFn: () => getDashboard(userId),
  });

  const displayMatches = matches.length > 0 ? matches : (data?.career_matches ?? []);

  if (isLoading) return <LoadingSpinner text="Loading dashboard..." />;

  if (error) {
    return (
      <div className="glass-card p-6 border-red-500/30 text-red-400">
        Failed to load dashboard. Ensure the backend is running.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Your Dashboard
        </h1>
        <p className="text-slate-400">
          Overview of your career analysis, simulations, and saved reports.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard
          label="Saved Reports"
          value={String(data?.saved_reports_count ?? 0)}
          icon={FileText}
          color="text-indigo-400"
        />
        <StatCard
          label="Career Matches"
          value={String(displayMatches.length)}
          icon={Brain}
          color="text-emerald-400"
        />
        <StatCard
          label="Simulations Run"
          value={String(data?.simulations.length ?? 0)}
          icon={BarChart3}
          color="text-amber-400"
        />
      </div>

      <section className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-indigo-400" />
          <h2 className="font-display text-lg font-semibold text-white">Profile</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-500">Name</span>
            <p className="text-white font-medium">{data?.user.name}</p>
          </div>
          <div>
            <span className="text-slate-500">Email</span>
            <p className="text-white font-medium">{data?.user.email}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-white mb-4">
          Career Matches
        </h2>
        {displayMatches.length > 0 ? (
          <div className="space-y-3">
            {displayMatches.map((match, i) => (
              <CareerCard key={match.career_name} match={match} rank={i + 1} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-center text-slate-400">
            No career matches yet. Complete the assessment to get recommendations.
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-white mb-4">
          Simulation Results
        </h2>
        {data?.simulations && data.simulations.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {data.simulations.map((sim, i) => (
              <motion.div
                key={sim.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-5"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-white">{sim.career_name}</h3>
                  <span className="text-xs text-slate-500">
                    {new Date(sim.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-slate-500">Avg Salary</span>
                    <p className="text-white font-medium">₹{sim.average_salary.toFixed(1)}L</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Stability</span>
                    <p className="text-white font-medium">{sim.stability_score}/100</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Best Case</span>
                    <p className="text-emerald-400 font-medium">₹{sim.best_case.toFixed(1)}L</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Worst Case</span>
                    <p className="text-red-400 font-medium">₹{sim.worst_case.toFixed(1)}L</p>
                  </div>
                  <div>
                    <span className="text-slate-500">P(&gt;₹20L)</span>
                    <p className="text-indigo-300 font-medium">{sim.probability_20L.toFixed(1)}%</p>
                  </div>
                  <div>
                    <span className="text-slate-500">P(&gt;₹50L)</span>
                    <p className="text-indigo-300 font-medium">{sim.probability_50L.toFixed(1)}%</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-center text-slate-400">
            No simulations yet. Run the Monte Carlo simulator to see results here.
          </div>
        )}
      </section>
    </div>
  );
}
