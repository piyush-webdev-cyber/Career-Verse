import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { type LucideIcon } from 'lucide-react';
import type { QuestionnaireData } from '../types';
import { CHART } from '../lib/chartTheme';
import Card, { CardHeader } from './ui/Card';
import Progress from './ui/Progress';
import Badge from './ui/Badge';

interface Props {
  form: QuestionnaireData;
  progress: number;
}

function getPersonalitySummary(form: QuestionnaireData): { type: string; traits: string[] } {
  const scores = [
    { key: 'Technical', value: (form.interest_coding + form.interest_math) / 2 },
    { key: 'Creative', value: form.interest_creativity },
    { key: 'Business', value: form.interest_business },
    { key: 'Scientific', value: form.interest_biology },
    { key: 'Leadership', value: form.leadership_interest },
  ].sort((a, b) => b.value - a.value);

  const dominant = scores[0];
  const typeMap: Record<string, string> = {
    Technical: 'Analytical Builder',
    Creative: 'Creative Innovator',
    Business: 'Strategic Operator',
    Scientific: 'Research Explorer',
    Leadership: 'Visionary Leader',
  };

  return {
    type: typeMap[dominant.key] ?? 'Balanced Generalist',
    traits: scores.slice(0, 3).map((s) => s.key),
  };
}

export default function AssessmentSidebar({ form, progress }: Props) {
  const radarData = useMemo(
    () => [
      { trait: 'Coding', value: form.interest_coding },
      { trait: 'Math', value: form.interest_math },
      { trait: 'Biology', value: form.interest_biology },
      { trait: 'Business', value: form.interest_business },
      { trait: 'Creative', value: form.interest_creativity },
      { trait: 'Leadership', value: form.leadership_interest },
    ],
    [form]
  );

  const skillScore = Math.round(
    (form.interest_coding +
      form.interest_math +
      form.interest_business +
      form.interest_creativity) /
      4 *
      10
  );

  const { type, traits } = getPersonalitySummary(form);

  return (
    <div className="space-y-4 lg:sticky lg:top-20">
      <Card variant="analytics">
        <CardHeader title="Assessment progress" description="Complete all dimensions for best matches" />
        <Progress value={progress} className="mb-2" />
        <p className="text-2xs text-secondary tabular-nums">{Math.round(progress)}% complete</p>
      </Card>

      <Card variant="analytics">
        <CardHeader title="Profile preview" />
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="highlight">{type}</Badge>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {traits.map((t) => (
            <Badge key={t} variant="default">{t}</Badge>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <RechartsRadar data={radarData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke={CHART.grid} />
            <PolarAngleAxis dataKey="trait" tick={{ fill: CHART.axis, fontSize: 10 }} />
            <Radar
              dataKey="value"
              stroke={CHART.primary}
              fill={CHART.primary}
              fillOpacity={0.15}
              strokeWidth={1.5}
            />
          </RechartsRadar>
        </ResponsiveContainer>
      </Card>

      <Card padding="sm">
        <div className="flex items-center justify-between">
          <span className="text-2xs text-muted">Composite skill score</span>
          <span className="text-lg font-semibold text-foreground tabular-nums">{skillScore}</span>
        </div>
        <Progress value={skillScore} max={100} className="mt-2" variant="success" />
      </Card>
    </div>
  );
}

export function QuestionSlider({
  label,
  icon: Icon,
  value,
  onChange,
  min = 0,
  max = 10,
}: {
  label: string;
  icon?: LucideIcon;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="py-3 border-b border-line last:border-0">
      <div className="flex items-center justify-between mb-2.5">
        <label className="flex items-center gap-2 text-sm text-foreground">
          {Icon && <Icon className="w-3.5 h-3.5 text-secondary" strokeWidth={1.75} />}
          {label}
        </label>
        <span className="text-xs font-medium text-accent tabular-nums w-6 text-right">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
      <div className="flex justify-between text-2xs text-secondary mt-1">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
}

export function MatchResultCard({
  rank,
  name,
  match,
  reasoning,
  salary,
  education,
  onSelect,
}: {
  rank: number;
  name: string;
  match: number;
  reasoning: string;
  salary: number;
  education: number;
  onSelect?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.05 }}
    >
      <Card
        hover
        className={onSelect ? 'cursor-pointer' : ''}
        onClick={onSelect}
      >
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <span className="text-xs font-semibold text-accent">{rank}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className="text-sm font-semibold text-foreground">{name}</h3>
              <Badge variant={match >= 80 ? 'success' : 'accent'}>{match}%</Badge>
            </div>
            <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-3">{reasoning}</p>
            <div className="flex gap-4 text-2xs text-secondary">
              <span>₹{salary}L starting</span>
              <span>{education}yr education</span>
            </div>
            <Progress value={match} className="mt-3" size="sm" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
