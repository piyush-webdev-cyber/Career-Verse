import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { GitCompare, Trophy, Check } from 'lucide-react';
import { cn } from '../lib/cn';
import { useCareers } from '../hooks/useCareers';
import { compareCareers } from '../services/api';
import ParallelUniverseCard from '../components/ParallelUniverseCard';
import ComparisonBarChart from '../charts/ComparisonBarChart';
import RadarChartComponent from '../charts/RadarChart';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { LoadingState } from '../components/ui/EmptyState';
import { CHART } from '../lib/chartTheme';

const RADAR_COLORS = CHART.series;

export default function ParallelUniversePage() {
  const { data: careers, isLoading } = useCareers();
  const [selected, setSelected] = useState<number[]>([]);

  const mutation = useMutation({
    mutationFn: () => compareCareers(selected),
  });

  const toggleCareer = (id: number) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
    mutation.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Parallel universe"
        description="Select 2–3 careers and compare alternate futures across earnings, stability, AI risk, and demand."
        badge={<Badge variant="default">{selected.length}/3 selected</Badge>}
      />

      <Card variant="analytics">
        <CardHeader title="Choose career paths" description="Tap to select up to 3 universes" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {isLoading ? (
            <LoadingState text="Loading careers..." />
          ) : (
            careers?.map((career) => {
              const isSelected = selected.includes(career.id);
              const order = selected.indexOf(career.id);
              return (
                <button
                  key={career.id}
                  type="button"
                  onClick={() => toggleCareer(career.id)}
                  className={cn(
                    'relative p-3 rounded-lg border text-left transition-all duration-150',
                    isSelected
                      ? 'bg-accent/8 border-accent/30 text-foreground'
                      : 'bg-surface-raised border-line text-muted hover:border-line-strong hover:text-foreground'
                  )}
                >
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </span>
                  )}
                  <span className="text-sm font-medium block pr-6">{career.name}</span>
                  <span className="text-2xs text-secondary mt-0.5 block">
                    ₹{career.avg_starting_salary}L · {career.education_years}yr
                  </span>
                  {isSelected && order >= 0 && (
                    <span className="text-2xs text-accent mt-1 block">
                      Universe {String.fromCharCode(65 + order)}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-line">
          <Button
            onClick={() => mutation.mutate()}
            disabled={selected.length < 2 || mutation.isPending}
          >
            <GitCompare className="w-3.5 h-3.5" />
            {mutation.isPending ? 'Comparing...' : 'Compare universes'}
          </Button>
        </div>
      </Card>

      {mutation.isPending && <LoadingState text="Building comparison..." />}

      {mutation.data && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {mutation.data.summary && (
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: 'Highest earnings', value: mutation.data.summary.highest_earnings, icon: Trophy },
                { label: 'Most stable', value: mutation.data.summary.most_stable },
                { label: 'Lowest AI risk', value: mutation.data.summary.lowest_ai_risk },
              ].map(({ label, value, icon: Icon }) => (
                <Card key={label} padding="sm" className="flex items-center gap-3">
                  {Icon && <Icon className="w-4 h-4 text-warning flex-shrink-0" strokeWidth={1.75} />}
                  <div>
                    <p className="text-2xs text-muted">{label}</p>
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mutation.data.careers.map((career, i) => (
              <ParallelUniverseCard key={career.id} career={career} index={i} />
            ))}
          </div>

          <Card variant="analytics">
            <CardHeader title="Multi-metric comparison" />
            <ComparisonBarChart careers={mutation.data.careers} />
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mutation.data.careers.map((career, i) => (
              <Card key={career.id} variant="analytics">
                <CardHeader title={career.name} description="Risk vs reward profile" />
                <RadarChartComponent
                  metrics={career.radar}
                  color={RADAR_COLORS[i]}
                  name={career.name}
                />
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
