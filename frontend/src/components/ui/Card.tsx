import { cn } from '../../lib/cn';

type CardVariant = 'default' | 'raised' | 'ghost' | 'analytics';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variants: Record<CardVariant, string> = {
  default: 'bg-surface shadow-card',
  raised: 'bg-surface-raised shadow-elevated',
  ghost: 'bg-transparent border border-line',
  analytics: 'bg-surface shadow-card border border-line/60',
};

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

export default function Card({
  children,
  className,
  variant = 'default',
  hover = false,
  padding = 'md',
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl',
        variants[variant],
        paddings[padding],
        hover && 'transition-all duration-200 hover:border-line-strong hover:shadow-elevated cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-4', className)}>
      <div>
        <h3 className="text-sm font-semibold text-foreground tracking-tight">{title}</h3>
        {description && (
          <p className="text-xs text-muted mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
