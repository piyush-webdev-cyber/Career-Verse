import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  GitCompare,
  Trophy,
  Plus,
  Search,
  AlertCircle,
} from 'lucide-react';
import { cn } from '../lib/cn';
import { CAREER_CATEGORIES, type CareerCategory, type CompareCareerOption } from '../data/careers';
import { useCompareCareers } from '../hooks/useCompareCareers';
import { compareCareerOptions } from '../lib/compareCareersLocal';
import ParallelUniverseCard from '../components/ParallelUniverseCard';
import CareerSelectCard from '../components/CareerSelectCard';
import AddCustomCareerDialog from '../components/AddCustomCareerDialog';
import ComparisonBarChart from '../charts/ComparisonBarChart';
import RadarChartComponent from '../charts/RadarChart';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { LoadingState } from '../components/ui/EmptyState';
import { CHART } from '../lib/chartTheme';
import type { CompareResponse } from '../types';

const RADAR_COLORS = CHART.series;

export default function ParallelUniversePage() {
  const { allCareers, addCustomCareer } = useCompareCareers();
  const [selected, setSelected] = useState<number[]>([]);
  const [category, setCategory] = useState<'All' | CareerCategory>('All');
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [compareResult, setCompareResult] = useState<CompareResponse | null>(null);
  const [comparing, setComparing] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allCareers.filter((c) => {
      const catOk = category === 'All' || c.category === category;
      if (!catOk) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.notes?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [allCareers, category, search]);

  const selectedCareers = useMemo(
    () =>
      selected
        .map((id) => allCareers.find((c) => c.id === id))
        .filter((c): c is CompareCareerOption => Boolean(c)),
    [selected, allCareers]
  );

  const atMax = selected.length >= 3;

  const toggleCareer = (id: number) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
    setCompareResult(null);
  };

  const handleCompare = () => {
    if (selectedCareers.length < 2) return;
    setComparing(true);
    // Brief delay for UX parity with previous API call feel
    window.setTimeout(() => {
      setCompareResult(compareCareerOptions(selectedCareers));
      setComparing(false);
    }, 280);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Parallel universe"
        description="Select 2–3 careers and compare alternate futures across earnings, stability, AI risk, and demand."
        badge={<Badge variant="default">{selected.length}/3 selected</Badge>}
      />

      <Card variant="analytics">
        <CardHeader
          title="Choose career paths"
          description="Search or filter by industry — tap to select up to 3 universes"
        />

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search careers — AI, Doctor, Pilot..."
              className="pl-9"
              aria-label="Search careers"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {CAREER_CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-2xs font-medium border transition-all duration-150',
                  active
                    ? 'bg-accent/15 border-accent/40 text-accent'
                    : 'bg-surface-raised border-line text-muted hover:text-foreground hover:border-line-strong'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {atMax && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-warning/10 border border-warning/20 text-warning text-xs">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            Maximum 3 careers can be compared. Deselect one to choose another.
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className={cn(
              'flex flex-col items-center justify-center gap-2 min-h-[108px] p-3.5 rounded-xl',
              'border border-dashed border-accent/40 bg-accent/[0.04]',
              'text-accent hover:bg-accent/[0.08] hover:border-accent/60 transition-all duration-200'
            )}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15">
              <Plus className="w-4 h-4" />
            </span>
            <span className="text-sm font-medium">Add custom career</span>
          </button>

          {filtered.map((career) => {
            const isSelected = selected.includes(career.id);
            return (
              <CareerSelectCard
                key={career.id}
                career={career}
                selected={isSelected}
                universeIndex={selected.indexOf(career.id)}
                disabled={atMax && !isSelected}
                onToggle={() => toggleCareer(career.id)}
              />
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-sm text-muted text-center py-8">
            No careers match your search. Try another term or add a custom career.
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-line flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <p className="text-2xs text-secondary">
            Showing {filtered.length} of {allCareers.length} careers
            {selectedCareers.length > 0 && (
              <>
                {' · '}
                <span className="text-muted">
                  {selectedCareers.map((c) => c.name).join(', ')}
                </span>
              </>
            )}
          </p>
          <Button
            onClick={handleCompare}
            disabled={selected.length < 2 || comparing}
          >
            <GitCompare className="w-3.5 h-3.5" />
            {comparing ? 'Comparing...' : 'Compare universes'}
          </Button>
        </div>
      </Card>

      <AddCustomCareerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={addCustomCareer}
      />

      {comparing && <LoadingState text="Building comparison..." />}

      {compareResult && !comparing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {compareResult.summary && (
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: 'Highest earnings', value: compareResult.summary.highest_earnings, icon: Trophy },
                { label: 'Most stable', value: compareResult.summary.most_stable },
                { label: 'Lowest AI risk', value: compareResult.summary.lowest_ai_risk },
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
            {compareResult.careers.map((career, i) => (
              <ParallelUniverseCard key={career.id} career={career} index={i} />
            ))}
          </div>

          <Card variant="analytics">
            <CardHeader title="Multi-metric comparison" />
            <ComparisonBarChart careers={compareResult.careers} />
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compareResult.careers.map((career, i) => (
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
