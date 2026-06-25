import { cn } from '../../lib/cn';

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'highlight';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-white/[0.06] text-muted border-line',
  accent: 'bg-accent/10 text-accent border-accent/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
  highlight: 'bg-highlight/10 text-highlight border-highlight/20',
};

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-2xs font-medium border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-2xs font-medium',
        'bg-surface-raised text-muted border border-line',
        className
      )}
    >
      {children}
    </span>
  );
}
