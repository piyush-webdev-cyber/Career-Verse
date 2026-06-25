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
import { CHART, tooltipStyle } from '../lib/chartTheme';

interface Props {
  insights: ProbabilityInsight[];
}

function barColor(probability: number, label: string): string {
  if (label.toLowerCase().includes('disruption')) {
    if (probability > 30) return CHART.danger;
    if (probability > 15) return CHART.warning;
    return CHART.success;
  }
  if (probability > 70) return CHART.success;
  if (probability > 40) return CHART.primary;
  return CHART.secondary;
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
    <ResponsiveContainer width="100%" height={Math.max(220, insights.length * 48)}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fill: CHART.axis, fontSize: 10 }}
          tickFormatter={(v) => `${v}%`}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={160}
          tick={{ fill: CHART.axis, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(value: number) => [`${value}%`, 'Probability']}
          labelFormatter={(_, payload) => payload?.[0]?.payload?.fullLabel ?? ''}
        />
        <Bar dataKey="probability" radius={[0, 4, 4, 0]} barSize={16}>
          {chartData.map((entry, index) => (
            <Cell key={index} fill={barColor(entry.probability, entry.fullLabel)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
