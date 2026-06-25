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
import { CHART, tooltipStyle } from '../lib/chartTheme';

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
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 48 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: CHART.axis, fontSize: 9 }}
          angle={-45}
          textAnchor="end"
          interval={2}
          axisLine={false}
          tickLine={false}
        />
        <YAxis tick={{ fill: CHART.axis, fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(value: number) => [value, 'Simulations']}
          labelFormatter={(_, payload) => payload?.[0]?.payload?.range ?? ''}
        />
        <Bar dataKey="count" fill={CHART.primary} radius={[3, 3, 0, 0]} opacity={0.9} />
      </BarChart>
    </ResponsiveContainer>
  );
}
