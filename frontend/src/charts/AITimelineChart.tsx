import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { AIDisruptionTimeline } from '../types';

interface Props {
  data: AIDisruptionTimeline[];
}

export default function AITimelineChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} />
        <YAxis
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          tickFormatter={(v) => `${v}%`}
          domain={[0, 100]}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(15,23,42,0.95)',
            border: '1px solid rgba(148,163,184,0.2)',
            borderRadius: '12px',
            color: '#e2e8f0',
          }}
          formatter={(value: number, name: string) => [
            `${value}%`,
            name === 'automation_pct' ? 'Tasks Automated' : 'AI Exposure Risk',
          ]}
        />
        <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey="automation_pct"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={{ fill: '#f59e0b', r: 5 }}
          name="Tasks Automated"
        />
        <Line
          type="monotone"
          dataKey="exposure_risk"
          stroke="#ef4444"
          strokeWidth={2}
          dot={{ fill: '#ef4444', r: 5 }}
          name="AI Exposure Risk"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
