import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { CompareCareer } from '../types';
import { CHART, tooltipStyle } from '../lib/chartTheme';

interface Props {
  careers: CompareCareer[];
}

export default function ComparisonBarChart({ careers }: Props) {
  const metrics = ['avg_earnings_projection', 'stability_score', 'ai_resistance', 'growth', 'flexibility', 'remote_opportunity'];
  const labels: Record<string, string> = {
    avg_earnings_projection: 'Earnings',
    stability_score: 'Stability',
    ai_resistance: 'AI Resistance',
    growth: 'Growth',
    flexibility: 'Flexibility',
    remote_opportunity: 'Remote',
  };

  const chartData = metrics.map((metric) => {
    const row: Record<string, string | number> = { metric: labels[metric] };
    careers.forEach((c) => {
      row[c.name] = (c as unknown as Record<string, number>)[metric];
    });
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
        <XAxis dataKey="metric" tick={{ fill: CHART.axis, fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: CHART.axis, fontSize: 10 }} axisLine={false} tickLine={false} width={32} />
        <Tooltip contentStyle={tooltipStyle} />
        {careers.map((c, i) => (
          <Bar key={c.id} dataKey={c.name} fill={CHART.series[i % CHART.series.length]} radius={[3, 3, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
