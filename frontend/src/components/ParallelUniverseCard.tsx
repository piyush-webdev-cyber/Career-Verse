import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import {
  IndianRupee,
  TrendingUp,
  Heart,
  Shield,
  Brain,
  Users,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import type { CompareCareer } from '../types';
import { CHART } from '../lib/chartTheme';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Progress from './ui/Progress';

const ACCENTS = [CHART.primary, CHART.success, CHART.highlight];

interface Props {
  career: CompareCareer;
  index: number;
}

function miniGrowthData(career: CompareCareer) {
  const start = career.avg_starting_salary;
  const end = career.avg_earnings_projection;
  return Array.from({ length: 6 }, (_, i) => ({
    x: i,
    y: start + ((end - start) * i) / 5,
  }));
}

export default function ParallelUniverseCard({ career, index }: Props) {
  const accent = ACCENTS[index % ACCENTS.length];
  const happiness = Math.round((10 - career.stress) * 10);
  const miniData = miniGrowthData(career);

  const metrics = [
    { icon: IndianRupee, label: '10yr earnings', value: `₹${career.avg_earnings_projection}L` },
    { icon: TrendingUp, label: 'Growth', value: `${career.growth}%` },
    { icon: Heart, label: 'Wellbeing', value: `${happiness}/100` },
    { icon: Shield, label: 'Stability', value: `${career.stability_score}` },
    { icon: Brain, label: 'AI resistance', value: `${career.ai_resistance}%` },
    { icon: Users, label: 'Demand', value: `${career.demand_score}` },
    { icon: AlertTriangle, label: 'AI risk', value: `${career.ai_risk}%` },
    { icon: Clock, label: 'Education', value: `${career.education_years}yr` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
    >
      <Card variant="raised" className="h-full flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <span className="text-2xs font-mono text-secondary">Universe {String.fromCharCode(65 + index)}</span>
            <h3 className="text-base font-semibold text-foreground mt-0.5">{career.name}</h3>
          </div>
          <Badge variant={career.stability_score >= 70 ? 'success' : 'default'}>
            {career.stability_level}
          </Badge>
        </div>

        <div className="rounded-lg bg-white/[0.02] border border-line/50 p-3 mb-4">
          <p className="text-2xs text-muted mb-2">Salary trajectory</p>
          <ResponsiveContainer width="100%" height={56}>
            <AreaChart data={miniData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id={`mini-${career.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accent} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="y" stroke={accent} fill={`url(#mini-${career.id})`} strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 flex-1">
          {metrics.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-3 h-3 text-secondary flex-shrink-0" strokeWidth={1.75} />
              <div className="min-w-0">
                <p className="text-2xs text-secondary truncate">{label}</p>
                <p className="text-xs font-medium text-foreground tabular-nums">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-line space-y-2">
          <div className="flex justify-between text-2xs">
            <span className="text-muted">Remote opportunity</span>
            <span className="text-foreground tabular-nums">{career.remote_opportunity}/10</span>
          </div>
          <Progress value={career.remote_opportunity * 10} size="sm" />
        </div>
      </Card>
    </motion.div>
  );
}
