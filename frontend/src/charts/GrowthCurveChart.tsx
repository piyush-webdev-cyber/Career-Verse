import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { GrowthCurvePoint } from '../types';
import { CHART, tooltipStyle } from '../lib/chartTheme';

interface Props {
  data: GrowthCurvePoint[];
  highlightYear?: number;
}

export default function GrowthCurveChart({ data, highlightYear }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="p50Grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART.primary} stopOpacity={0.2} />
            <stop offset="100%" stopColor={CHART.primary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
        <XAxis
          dataKey="year"
          tick={{ fill: CHART.axis, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          label={{ value: 'Year', position: 'insideBottom', offset: -2, fill: CHART.axis, fontSize: 10 }}
        />
        <YAxis
          tick={{ fill: CHART.axis, fontSize: 11 }}
          tickFormatter={(v) => `₹${v}L`}
          axisLine={false}
          tickLine={false}
          width={48}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(value: number) => [`₹${value.toFixed(1)}L`]}
        />
        {highlightYear && (
          <ReferenceLine x={highlightYear} stroke={CHART.highlight} strokeDasharray="4 4" strokeOpacity={0.6} />
        )}
        <Area type="monotone" dataKey="p90" stroke={CHART.success} fill="none" strokeWidth={1} strokeDasharray="4 4" name="P90" />
        <Area type="monotone" dataKey="p50" stroke={CHART.primary} fill="url(#p50Grad)" strokeWidth={2} name="Median" />
        <Area type="monotone" dataKey="p10" stroke={CHART.danger} fill="none" strokeWidth={1} strokeDasharray="4 4" name="P10" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
