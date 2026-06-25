import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { TrendingUp, Shield, Brain, Activity } from 'lucide-react';
import { CHART } from '../lib/chartTheme';
import { cn } from '../lib/cn';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Progress from './ui/Progress';

const SALARY_DATA = [
  { year: 'Y1', p50: 12, p90: 18 },
  { year: 'Y3', p50: 22, p90: 32 },
  { year: 'Y5', p50: 35, p90: 48 },
  { year: 'Y7', p50: 48, p90: 65 },
  { year: 'Y10', p50: 62, p90: 85 },
  { year: 'Y15', p50: 78, p90: 110 },
];

const PROB_DATA = [
  { label: '₹20L', prob: 89 },
  { label: '₹50L', prob: 54 },
  { label: '₹1Cr', prob: 21 },
];

const TIMELINE = [
  { year: 2026, risk: 12 },
  { year: 2030, risk: 28 },
  { year: 2035, risk: 45 },
  { year: 2040, risk: 58 },
];

export default function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="relative"
    >
      <Card variant="raised" padding="none" className="overflow-hidden">
        <div className="px-4 py-3 border-b border-line flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-2xs font-medium text-muted">Live simulation preview</span>
          </div>
          <Badge variant="accent">Software Engineer</Badge>
        </div>

        <div className="p-4 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: TrendingUp, label: 'Median Y15', value: '₹78L', color: 'text-success' },
              { icon: Shield, label: 'Stability', value: '82', color: 'text-accent' },
              { icon: Brain, label: 'AI Risk', value: '35%', color: 'text-warning' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="p-2.5 rounded-lg bg-white/[0.03] border border-line/50">
                <Icon className={cn('w-3 h-3 mb-1', color)} strokeWidth={1.75} />
                <p className="text-2xs text-secondary">{label}</p>
                <p className={cn('text-sm font-semibold tabular-nums', color)}>{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-white/[0.02] border border-line/50 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xs font-medium text-muted">Salary projection</span>
              <Activity className="w-3 h-3 text-secondary" />
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={SALARY_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART.primary} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={CHART.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fill: CHART.axis, fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Area
                  type="monotone"
                  dataKey="p50"
                  stroke={CHART.primary}
                  fill="url(#heroGrad)"
                  strokeWidth={1.5}
                />
                <Area
                  type="monotone"
                  dataKey="p90"
                  stroke={CHART.success}
                  fill="none"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-white/[0.02] border border-line/50 p-3">
              <p className="text-2xs font-medium text-muted mb-2">Milestone probability</p>
              <ResponsiveContainer width="100%" height={64}>
                <BarChart data={PROB_DATA} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
                  <XAxis dataKey="label" tick={{ fill: CHART.axis, fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Bar dataKey="prob" fill={CHART.primary} radius={[2, 2, 0, 0]} opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-lg bg-white/[0.02] border border-line/50 p-3">
              <p className="text-2xs font-medium text-muted mb-2">AI exposure timeline</p>
              <div className="space-y-2 mt-1">
                {TIMELINE.map(({ year, risk }) => (
                  <div key={year} className="flex items-center gap-2">
                    <span className="text-2xs text-secondary w-8 tabular-nums">{year}</span>
                    <Progress value={risk} size="sm" variant={risk > 40 ? 'warning' : 'accent'} className="flex-1" />
                    <span className="text-2xs text-muted w-7 tabular-nums">{risk}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-accent/5 to-transparent pointer-events-none -z-10" />
    </motion.div>
  );
}
