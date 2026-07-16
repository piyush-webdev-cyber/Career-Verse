import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-10 px-3 text-sm text-foreground bg-surface border border-line rounded-lg',
            'placeholder:text-secondary/70',
            'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-danger/50 focus:ring-danger/30',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-2xs text-danger">{error}</p>
        ) : hint ? (
          <p className="text-2xs text-secondary">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
