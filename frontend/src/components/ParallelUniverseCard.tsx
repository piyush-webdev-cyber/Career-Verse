import { motion } from 'framer-motion';
import {
  Shield,
  Brain,
  TrendingUp,
  Heart,
  Wifi,
  IndianRupee,
} from 'lucide-react';
import type { CompareCareer } from '../types';

const COLORS = [
  'from-indigo-500/20 to-purple-500/20 border-indigo-500/30',
  'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
  'from-pink-500/20 to-rose-500/20 border-pink-500/30',
];

interface Props {
  career: CompareCareer;
  index: number;
}

export default function ParallelUniverseCard({ career, index }: Props) {
  const colorClass = COLORS[index % COLORS.length];

  const metrics = [
    { icon: IndianRupee, label: 'Avg Earnings (10yr)', value: `₹${career.avg_earnings_projection}L` },
    { icon: Shield, label: 'Stability', value: `${career.stability_score}/100` },
    { icon: Brain, label: 'AI Risk', value: `${career.ai_risk}%` },
    { icon: TrendingUp, label: 'Growth', value: `${career.growth}%` },
    { icon: Heart, label: 'Stress', value: `${career.stress}/10` },
    { icon: Wifi, label: 'Remote', value: `${career.remote_opportunity}/10` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className={`glass-card p-6 bg-gradient-to-b ${colorClass}`}
    >
      <div className="text-center mb-6">
        <div className="inline-block px-3 py-1 rounded-full bg-slate-800/60 text-xs text-slate-400 mb-3">
          Universe {String.fromCharCode(65 + index)}
        </div>
        <h3 className="font-display text-xl font-bold text-white">{career.name}</h3>
        <p className="text-sm text-slate-400 mt-1">{career.stability_level}</p>
      </div>

      <div className="space-y-3">
        {metrics.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between py-2 border-b border-surface-border last:border-0"
          >
            <span className="flex items-center gap-2 text-sm text-slate-400">
              <Icon className="w-4 h-4" />
              {label}
            </span>
            <span className="text-sm font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-surface-border">
        <div className="flex justify-between text-xs text-slate-500">
          <span>Flexibility: {career.flexibility}/10</span>
          <span>Education: {career.education_years}yr</span>
        </div>
      </div>
    </motion.div>
  );
}
