import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../lib/cn';
import { CAREER_ICONS, type CompareCareerOption } from '../data/careers';
import Badge from './ui/Badge';

interface Props {
  career: CompareCareerOption;
  selected: boolean;
  universeIndex?: number;
  disabled?: boolean;
  onToggle: () => void;
}

export default function CareerSelectCard({
  career,
  selected,
  universeIndex,
  disabled,
  onToggle,
}: Props) {
  const Icon = CAREER_ICONS[career.icon] ?? CAREER_ICONS.briefcase;

  return (
    <motion.button
      type="button"
      layout
      whileHover={disabled && !selected ? undefined : { y: -2 }}
      whileTap={disabled && !selected ? undefined : { scale: 0.98 }}
      onClick={onToggle}
      disabled={disabled && !selected}
      aria-pressed={selected}
      className={cn(
        'relative text-left p-3.5 rounded-xl border transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
        selected
          ? 'border-accent bg-accent/[0.08] shadow-[0_0_0_1px_rgba(79,124,255,0.35),0_0_24px_rgba(79,124,255,0.15)] scale-[1.02]'
          : 'border-line bg-surface-raised hover:border-line-strong hover:bg-surface-hover',
        disabled && !selected && 'opacity-45 cursor-not-allowed hover:border-line hover:bg-surface-raised'
      )}
    >
      {selected && (
        <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center shadow-soft">
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </span>
      )}

      <div className="flex items-start gap-3 pr-6">
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border',
            selected ? 'border-accent/30 bg-accent/15 text-accent' : 'border-line bg-white/[0.03] text-muted'
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground truncate">{career.name}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <Badge variant={career.isCustom ? 'highlight' : 'default'}>
              {career.isCustom ? 'Custom' : career.category}
            </Badge>
          </div>
          <p className="text-2xs text-secondary mt-2 tabular-nums">
            ₹{career.averageSalary}L · {career.educationYears}yr education
          </p>
          {selected && universeIndex !== undefined && universeIndex >= 0 && (
            <p className="text-2xs text-accent mt-1 font-medium">
              Universe {String.fromCharCode(65 + universeIndex)}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}
