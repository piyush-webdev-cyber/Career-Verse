import { motion } from 'framer-motion';

interface Props {
  score: number;
  level: string;
  explanation: string;
}

function getColor(score: number): string {
  if (score >= 75) return 'from-emerald-500 to-green-400';
  if (score >= 50) return 'from-amber-500 to-yellow-400';
  return 'from-red-500 to-orange-400';
}

export default function StabilityMeter({ score, level, explanation }: Props) {
  const color = getColor(score);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-white">Career Stability Score</h3>
        <span className={`text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r ${color} text-white`}>
          {level}
        </span>
      </div>

      <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${color} rounded-full`}
        />
      </div>

      <div className="flex justify-between text-sm mb-4">
        <span className="text-slate-500">0</span>
        <span className="font-display font-bold text-2xl text-white">{score.toFixed(1)}</span>
        <span className="text-slate-500">100</span>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed">{explanation}</p>
    </div>
  );
}
