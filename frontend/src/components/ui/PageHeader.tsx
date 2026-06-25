import { cn } from '../../lib/cn';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  action,
  badge,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8', className)}>
      <div className="space-y-2 min-w-0 flex-1">
        {badge}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground tracking-tight text-balance">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0 self-start sm:self-auto">{action}</div>}
    </div>
  );
}

export function Section({
  title,
  description,
  action,
  children,
  className,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('space-y-4', className)}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-sm font-semibold text-foreground tracking-tight">{title}</h2>
            )}
            {description && (
              <p className="text-xs text-muted mt-0.5">{description}</p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
