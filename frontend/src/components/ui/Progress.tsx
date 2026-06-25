import { cn } from '../../lib/cn';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  size?: 'sm' | 'md';
  variant?: 'accent' | 'success' | 'warning' | 'danger';
}

const barColors = {
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

export default function Progress({
  value,
  max = 100,
  className,
  size = 'md',
  variant = 'accent',
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={cn(
        'w-full rounded-full bg-white/[0.06] overflow-hidden',
        size === 'sm' ? 'h-1' : 'h-1.5',
        className
      )}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={cn('h-full rounded-full transition-all duration-500 ease-out', barColors[variant])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
