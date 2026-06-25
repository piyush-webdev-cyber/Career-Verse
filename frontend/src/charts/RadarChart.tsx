import {
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

interface Props {
  metrics: Record<string, number>;
  color?: string;
  name?: string;
}

const LABELS: Record<string, string> = {
  salary_potential: 'Salary',
  stability: 'Stability',
  ai_resistance: 'AI Resistance',
  growth: 'Growth',
  flexibility: 'Flexibility',
  work_life_balance: 'Work-Life',
};

export default function RadarChartComponent({
  metrics,
  color = '#818cf8',
  name = 'Career',
}: Props) {
  const data = Object.entries(metrics).map(([key, value]) => ({
    metric: LABELS[key] ?? key,
    value: Math.round(value),
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RechartsRadar data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="rgba(148,163,184,0.2)" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: '#64748b', fontSize: 9 }}
        />
        <Radar
          name={name}
          dataKey="value"
          stroke={color}
          fill={color}
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(15,23,42,0.95)',
            border: '1px solid rgba(148,163,184,0.2)',
            borderRadius: '12px',
            color: '#e2e8f0',
          }}
        />
        <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
