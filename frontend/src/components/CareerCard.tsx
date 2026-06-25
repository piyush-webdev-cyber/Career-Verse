import { motion } from 'framer-motion';
import { TrendingUp, GraduationCap, IndianRupee } from 'lucide-react';
import type { CareerMatch } from '../types';

interface Props {
  match: CareerMatch;
  rank: number;
  onSelect?: () => void;
  selected?: boolean;
}

export default function CareerCard({ match, rank, onSelect, selected }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.1 }}
      onClick={onSelect}
      className={`glass-card-hover p-5 cursor-pointer ${
        selected ? 'border-indigo-500/50 ring-1 ring-indigo-500/30' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center">
          <span className="font-display font-bold text-indigo-300">#{rank}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-display font-semibold text-white truncate">
              {match.career_name}
            </h3>
            <div className="flex-shrink-0 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30">
              <span className="text-sm font-bold text-indigo-300">
                {match.match_percentage}%
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-400 mb-3 line-clamp-2">{match.reasoning}</p>
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <IndianRupee className="w-3 h-3" />
              {match.avg_starting_salary}L starting
            </span>
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3 h-3" />
              {match.education_years}yr education
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Match
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
