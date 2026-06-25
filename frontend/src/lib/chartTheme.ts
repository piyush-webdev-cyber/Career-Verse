export const CHART = {
  primary: '#4F7CFF',
  secondary: '#6B7280',
  success: '#10B981',
  warning: '#F97316',
  danger: '#EF4444',
  highlight: '#8B5CF6',
  grid: 'rgba(255,255,255,0.06)',
  axis: '#71717A',
  tooltip: {
    bg: '#111217',
    border: 'rgba(255,255,255,0.08)',
    text: '#FAFAFA',
  },
  series: ['#4F7CFF', '#10B981', '#8B5CF6'],
} as const;

export const tooltipStyle = {
  background: CHART.tooltip.bg,
  border: `1px solid ${CHART.tooltip.border}`,
  borderRadius: '8px',
  fontSize: '12px',
  color: CHART.tooltip.text,
  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
};
