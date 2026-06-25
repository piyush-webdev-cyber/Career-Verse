import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { AIDisruptionTimeline } from '../types';
import { CHART, tooltipStyle } from '../lib/chartTheme';

interface Props {
  data: AIDisruptionTimeline[];
}

export default function AITimelineChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
        <XAxis dataKey="year" tick={{ fill: CHART.axis, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fill: CHART.axis, fontSize: 11 }}
          tickFormatter={(v) => `${v}%`}
          domain={[0, 100]}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(value: number, name: string) => [
            `${value}%`,
            name === 'automation_pct' ? 'Tasks automated' : 'AI exposure',
          ]}
        />
        <Line
          type="monotone"
          dataKey="automation_pct"
          stroke={CHART.warning}
          strokeWidth={2}
          dot={{ fill: CHART.warning, r: 3, strokeWidth: 0 }}
          name="automation_pct"
        />
        <Line
          type="monotone"
          dataKey="exposure_risk"
          stroke={CHART.danger}
          strokeWidth={2}
          dot={{ fill: CHART.danger, r: 3, strokeWidth: 0 }}
          name="exposure_risk"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
