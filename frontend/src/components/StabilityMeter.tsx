import { cn } from '../lib/cn';
import Card, { CardHeader } from './ui/Card';
import Progress from './ui/Progress';
import Badge from './ui/Badge';

interface Props {
  score: number;
  level: string;
  explanation: string;
  compact?: boolean;
}

function variant(score: number): 'success' | 'warning' | 'danger' {
  if (score >= 75) return 'success';
  if (score >= 50) return 'warning';
  return 'danger';
}

export default function StabilityMeter({ score, level, explanation, compact }: Props) {
  const v = variant(score);

  return (
    <Card variant="analytics" className={compact ? '' : 'h-full'}>
      <CardHeader
        title="Career stability"
        action={<Badge variant={v}>{level}</Badge>}
      />
      <div className="flex items-end gap-3 mb-3">
        <span className="text-3xl font-semibold text-foreground tabular-nums tracking-tight">
          {score.toFixed(0)}
        </span>
        <span className="text-2xs text-secondary pb-1">/ 100</span>
      </div>
      <Progress value={score} variant={v} className="mb-4" />
      {!compact && (
        <p className="text-xs text-muted leading-relaxed">{explanation}</p>
      )}
    </Card>
  );
}

export function RiskMeter({ value, label }: { value: number; label: string }) {
  const v = value > 30 ? 'danger' : value > 15 ? 'warning' : 'success';
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-2xs">
        <span className="text-muted">{label}</span>
        <span className={cn('font-medium tabular-nums', v === 'danger' ? 'text-danger' : v === 'warning' ? 'text-warning' : 'text-success')}>
          {value.toFixed(1)}%
        </span>
      </div>
      <Progress value={value} variant={v} size="sm" />
    </div>
  );
}
