import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { CompareCareer } from '../types';

interface Props {
  careers: CompareCareer[];
}

const COLORS = ['#818cf8', '#34d399', '#f472b6'];

export default function ComparisonBarChart({ careers }: Props) {
  const metrics = ['avg_earnings_projection', 'stability_score', 'ai_resistance', 'growth', 'flexibility', 'remote_opportunity'];
  const labels: Record<string, string> = {
    avg_earnings_projection: 'Earnings',
    stability_score: 'Stability',
    ai_resistance: 'AI Resistance',
    growth: 'Growth %',
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
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
        <Tooltip
          contentStyle={{
            background: 'rgba(15,23,42,0.95)',
            border: '1px solid rgba(148,163,184,0.2)',
            borderRadius: '12px',
            color: '#e2e8f0',
          }}
        />
        <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
        {careers.map((c, i) => (
          <Bar
            key={c.id}
            dataKey={c.name}
            fill={COLORS[i % COLORS.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
