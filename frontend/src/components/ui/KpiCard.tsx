import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/cn';
import Card from './Card';

interface KpiCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  className?: string;
  delay?: number;
  layout?: 'vertical' | 'horizontal';
}

export default function KpiCard({
  label,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  className,
  delay = 0,
  layout = 'vertical',
}: KpiCardProps) {
  const changeColors = {
    positive: 'text-success',
    negative: 'text-danger',
    neutral: 'text-muted',
  };

  if (layout === 'horizontal') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.3 }}
      >
        <Card className={cn('flex items-center justify-between gap-4', className)} padding="sm">
          <div>
            <p className="text-2xs font-medium text-muted uppercase tracking-wider">{label}</p>
            <p className="text-xl font-semibold text-foreground mt-1 tabular-nums">{value}</p>
            {change && (
              <p className={cn('text-2xs mt-0.5', changeColors[changeType])}>{change}</p>
            )}
          </div>
          {Icon && (
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
              <Icon className="w-4 h-4 text-muted" strokeWidth={1.75} />
            </div>
          )}
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Card className={className} padding="sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-2xs font-medium text-muted uppercase tracking-wider">{label}</p>
          {Icon && <Icon className="w-3.5 h-3.5 text-secondary" strokeWidth={1.75} />}
        </div>
        <p className="text-2xl font-semibold text-foreground tabular-nums tracking-tight">{value}</p>
        {change && (
          <p className={cn('text-2xs mt-1.5', changeColors[changeType])}>{change}</p>
        )}
      </Card>
    </motion.div>
  );
}
