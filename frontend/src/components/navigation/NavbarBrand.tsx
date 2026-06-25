import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

interface NavbarBrandProps {
  scrolled?: boolean;
  onClick?: () => void;
  className?: string;
  /** Larger mark + wordmark for mobile header */
  mobile?: boolean;
}

export default function NavbarBrand({
  scrolled = false,
  onClick,
  className,
  mobile = false,
}: NavbarBrandProps) {
  const iconSize = mobile ? 44 : scrolled ? 36 : 40;

  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn(
        'group flex min-w-0 items-center gap-2.5 sm:gap-3 transition-transform duration-200 hover:scale-[1.01]',
        className,
      )}
    >
      <motion.div
        animate={{ width: iconSize, height: iconSize }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative flex shrink-0 items-center justify-center"
      >
        <span
          className={cn(
            'absolute inset-0 rounded-[14px] bg-gradient-to-br from-primary via-primary to-highlight opacity-40 blur-md',
            mobile && 'opacity-50 blur-lg scale-110',
          )}
          aria-hidden
        />
        <span
          className={cn(
            'absolute inset-0 rounded-[14px] ring-1 ring-white/20',
            mobile && 'ring-white/25',
          )}
          aria-hidden
        />
        <span
          className={cn(
            'relative flex h-full w-full items-center justify-center rounded-[14px]',
            'bg-gradient-to-br from-primary via-[#5b5ef0] to-highlight',
            'shadow-lg shadow-primary/30',
            mobile && 'shadow-xl shadow-primary/40',
          )}
        >
          <svg
            viewBox="0 0 32 32"
            className={cn('text-white', mobile ? 'h-6 w-6' : 'h-5 w-5')}
            fill="none"
            aria-hidden
          >
            <path
              d="M8 22V10l8 6 8-6v12"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="9" r="2" fill="currentColor" />
          </svg>
        </span>
      </motion.div>

      <div className={cn('min-w-0', mobile ? 'flex flex-col' : 'hidden sm:block')}>
        <motion.p
          animate={{ fontSize: scrolled && !mobile ? '0.9375rem' : mobile ? '1.0625rem' : '1.25rem' }}
          transition={{ duration: 0.3 }}
          className="font-bold leading-tight text-foreground whitespace-nowrap tracking-tight"
        >
          CareerVerse
          <span className="bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
            {' '}
            AI
          </span>
        </motion.p>
        <p
          className={cn(
            'text-muted leading-tight truncate',
            mobile ? 'text-[11px] font-medium' : 'hidden text-xs md:block',
          )}
        >
          Career Intelligence Platform
        </p>
      </div>
    </Link>
  );
}
