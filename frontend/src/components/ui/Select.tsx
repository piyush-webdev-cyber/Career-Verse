import { cn } from '../../lib/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export default function Select({ label, className, children, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-muted mb-1.5">{label}</label>
      )}
      <select
        className={cn(
          'w-full min-w-0 h-10 sm:h-9 px-3 text-sm text-foreground bg-surface-raised border border-line rounded-lg',
          '[color-scheme:dark] appearance-auto',
          'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
