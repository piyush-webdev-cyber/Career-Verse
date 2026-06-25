import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { GrowthCurvePoint } from '../types';

interface Props {
  data: GrowthCurvePoint[];
}

export default function GrowthCurveChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="p50Grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis
          dataKey="year"
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          label={{ value: 'Year', position: 'insideBottom', offset: -5, fill: '#64748b' }}
        />
        <YAxis
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          tickFormatter={(v) => `₹${v}L`}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(15,23,42,0.95)',
            border: '1px solid rgba(148,163,184,0.2)',
            borderRadius: '12px',
            color: '#e2e8f0',
          }}
          formatter={(value: number) => [`₹${value.toFixed(1)}L`]}
        />
        <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
        <Area
          type="monotone"
          dataKey="p90"
          stroke="#10b981"
          fill="none"
          strokeWidth={1}
          strokeDasharray="4 4"
          name="90th %ile"
        />
        <Area
          type="monotone"
          dataKey="p50"
          stroke="#818cf8"
          fill="url(#p50Grad)"
          strokeWidth={2}
          name="Median"
        />
        <Area
          type="monotone"
          dataKey="p10"
          stroke="#ef4444"
          fill="none"
          strokeWidth={1}
          strokeDasharray="4 4"
          name="10th %ile"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
