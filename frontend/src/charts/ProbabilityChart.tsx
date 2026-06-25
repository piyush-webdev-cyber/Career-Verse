import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { ProbabilityInsight } from '../types';

interface Props {
  insights: ProbabilityInsight[];
}

function getBarColor(probability: number, label: string): string {
  if (label.toLowerCase().includes('disruption')) {
    if (probability > 30) return '#ef4444';
    if (probability > 15) return '#f59e0b';
    return '#10b981';
  }
  if (probability > 70) return '#10b981';
  if (probability > 40) return '#818cf8';
  return '#6366f1';
}

export default function ProbabilityChart({ insights }: Props) {
  const chartData = insights.map((insight) => ({
    name: insight.label
      .replace('Probability of ', '')
      .replace(' within 15 years', '')
      .replace(' within 10 years', ' (10yr)'),
    probability: Math.round(insight.probability * 10) / 10,
    fullLabel: insight.label,
  }));

  return (
    <ResponsiveContainer width="100%" height={Math.max(250, insights.length * 55)}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          tickFormatter={(v) => `${v}%`}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={180}
          tick={{ fill: '#94a3b8', fontSize: 10 }}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(15,23,42,0.95)',
            border: '1px solid rgba(148,163,184,0.2)',
            borderRadius: '12px',
            color: '#e2e8f0',
          }}
          formatter={(value: number) => [`${value}%`, 'Probability']}
          labelFormatter={(_, payload) => payload?.[0]?.payload?.fullLabel ?? ''}
        />
        <Bar dataKey="probability" radius={[0, 6, 6, 0]} barSize={20}>
          {chartData.map((entry, index) => (
            <Cell
              key={index}
              fill={getBarColor(entry.probability, entry.fullLabel)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
