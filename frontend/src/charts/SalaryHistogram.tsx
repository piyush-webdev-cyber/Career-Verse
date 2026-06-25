import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { SalaryDistributionBin } from '../types';

interface Props {
  data: SalaryDistributionBin[];
}

export default function SalaryHistogram({ data }: Props) {
  const chartData = data.map((bin) => ({
    name: `₹${bin.range_start.toFixed(0)}L`,
    count: bin.count,
    range: bin.label,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis
          dataKey="name"
          tick={{ fill: '#94a3b8', fontSize: 10 }}
          angle={-45}
          textAnchor="end"
          interval={2}
        />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
        <Tooltip
          contentStyle={{
            background: 'rgba(15,23,42,0.95)',
            border: '1px solid rgba(148,163,184,0.2)',
            borderRadius: '12px',
            color: '#e2e8f0',
          }}
          formatter={(value: number) => [value, 'Simulations']}
          labelFormatter={(_, payload) =>
            payload?.[0]?.payload?.range ?? ''
          }
        />
        <Bar dataKey="count" fill="url(#salaryGradient)" radius={[4, 4, 0, 0]} />
        <defs>
          <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
}
