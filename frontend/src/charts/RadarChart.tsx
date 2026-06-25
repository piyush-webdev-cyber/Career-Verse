import {
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { CHART, tooltipStyle } from '../lib/chartTheme';

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
  color = CHART.primary,
  name = 'Career',
}: Props) {
  const data = Object.entries(metrics).map(([key, value]) => ({
    metric: LABELS[key] ?? key,
    value: Math.round(value),
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RechartsRadar data={data} cx="50%" cy="50%" outerRadius="72%">
        <PolarGrid stroke={CHART.grid} />
        <PolarAngleAxis dataKey="metric" tick={{ fill: CHART.axis, fontSize: 10 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: CHART.axis, fontSize: 8 }} axisLine={false} />
        <Radar name={name} dataKey="value" stroke={color} fill={color} fillOpacity={0.12} strokeWidth={1.5} />
        <Tooltip contentStyle={tooltipStyle} />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
