import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown, Activity, Target, Play, Plus } from 'lucide-react';
import { useCareers } from '../hooks/useCareers';
import { useSimulation } from '../hooks/useSimulation';
import { getAIDisruption } from '../services/api';
import { useCompareCareers } from '../hooks/useCompareCareers';
import { simulateCareerOption } from '../lib/simulateCareerLocal';
import { useApp } from '../context/AppContext';
import StabilityMeter, { RiskMeter } from '../components/StabilityMeter';
import AddCustomCareerDialog from '../components/AddCustomCareerDialog';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import KpiCard from '../components/ui/KpiCard';
import Badge from '../components/ui/Badge';
import { LoadingState } from '../components/ui/EmptyState';
import SalaryHistogram from '../charts/SalaryHistogram';
import GrowthCurveChart from '../charts/GrowthCurveChart';
import RadarChartComponent from '../charts/RadarChart';
import ProbabilityChart from '../charts/ProbabilityChart';
import AITimelineChart from '../charts/AITimelineChart';

export default function SimulatorPage() {
  const { data: careers, isLoading: careersLoading } = useCareers();
  const { customCareers, addCustomCareer } = useCompareCareers();
  const { lastSimulation, setLastSimulation, selectedCareerId, setSelectedCareerId } = useApp();
  const [careerId, setCareerId] = useState<number | null>(selectedCareerId);
  const [timelineYear, setTimelineYear] = useState(15);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [localResult, setLocalResult] = useState<typeof lastSimulation>(null);
  const [localPending, setLocalPending] = useState(false);
  const simulation = useSimulation();

  const selectedCareer = careers?.find((c) => c.id === careerId);
  const selectedCustomCareer = customCareers.find((c) => c.id === careerId);
  const activeCareerName = selectedCareer?.name ?? selectedCustomCareer?.name;

  const { data: aiData } = useQuery({
    queryKey: ['ai-disruption', activeCareerName],
    queryFn: () => getAIDisruption(activeCareerName!),
    enabled: !!activeCareerName,
  });

  useEffect(() => {
    if (selectedCareerId && !careerId) setCareerId(selectedCareerId);
  }, [selectedCareerId, careerId]);

  const handleCareerChange = (value: string) => {
    if (value === 'custom') {
      setDialogOpen(true);
      return;
    }
    setCareerId(value ? Number(value) : null);
    setLocalResult(null);
    simulation.reset();
  };

  const handleSimulate = () => {
    if (!careerId) return;

    if (selectedCustomCareer) {
      simulation.reset();
      setLocalPending(true);
      window.setTimeout(() => {
        const data = simulateCareerOption(selectedCustomCareer);
        setLocalResult(data);
        setLastSimulation(data);
        setTimelineYear(data.years);
        setLocalPending(false);
      }, 120);
      return;
    }

    setSelectedCareerId(careerId);
    setLocalResult(null);
    simulation.mutate(careerId, {
      onSuccess: (data) => {
        setLastSimulation(data);
        setTimelineYear(data.years);
      },
    });
  };

  const result = localResult ?? simulation.data ?? lastSimulation;
  const isRunning = simulation.isPending || localPending;

  const yearSnapshot = useMemo(() => {
    if (!result) return null;
    const point = result.growth_curve.find((p) => p.year === timelineYear) ?? result.growth_curve[result.growth_curve.length - 1];
    return point;
  }, [result, timelineYear]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Monte Carlo simulator"
        description="Run 10,000 probabilistic simulations over 15 years. All probabilities are computed from simulation output."
        action={
          <Badge variant="default">
            {result ? `${result.num_simulations.toLocaleString()} runs` : 'No results yet'}
          </Badge>
        }
      />

      <Card variant="analytics" padding="sm">
        <div className="flex flex-col sm:flex-row gap-3 p-2 sm:p-1">
          <Select
            label="Career path"
            value={careerId ?? ''}
            onChange={(e) => handleCareerChange(e.target.value)}
            disabled={careersLoading}
            className="flex-1 min-w-0"
          >
            <option value="" className="text-muted">
              Select career...
            </option>
            {careers?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — ₹{c.avg_starting_salary}L starting
              </option>
            ))}
            <option value="custom">+ Add custom career...</option>
            {customCareers.length > 0 && (
              <optgroup label="Custom careers">
                {customCareers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} - Rs {c.averageSalary}L starting
                  </option>
                ))}
              </optgroup>
            )}
          </Select>
          <div className="flex items-stretch sm:items-end gap-2 w-full sm:w-auto shrink-0">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setDialogOpen(true)}
              className="px-3"
              aria-label="Add custom career"
              title="Add custom career"
            >
              <Plus className="w-3.5 h-3.5" />
            </Button>
            <Button
              onClick={handleSimulate}
              disabled={!careerId || isRunning}
              className="flex-1 sm:flex-none sm:w-auto justify-center"
            >
              <Play className="w-3.5 h-3.5" />
              {isRunning ? 'Running...' : 'Run simulation'}
            </Button>
          </div>
        </div>
      </Card>

      <AddCustomCareerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={(input) => {
          const nextId = Math.max(9999, ...customCareers.map((c) => c.id)) + 1;
          addCustomCareer(input);
          setCareerId(nextId);
          setLocalResult(null);
          simulation.reset();
        }}
      />

      {isRunning && <LoadingState text="Processing 10,000 Monte Carlo simulations..." />}

      {simulation.isError && (
        <Card className="border-danger/30 bg-danger/5">
          <p className="text-sm text-danger">Simulation failed. Ensure the backend is running.</p>
        </Card>
      )}

      {result && !isRunning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-foreground">{result.career_name}</h2>
            <Badge variant="accent">{result.years} year horizon</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard label="Mean salary" value={`₹${result.mean_salary.toFixed(1)}L`} icon={TrendingUp} changeType="positive" delay={0} />
            <KpiCard label="Median" value={`₹${result.median_salary.toFixed(1)}L`} icon={Activity} delay={0.05} />
            <KpiCard label="Best case (P95)" value={`₹${result.best_case.toFixed(1)}L`} icon={Target} changeType="positive" delay={0.1} />
            <KpiCard label="Worst case (P5)" value={`₹${result.worst_case.toFixed(1)}L`} icon={TrendingDown} changeType="negative" delay={0.15} />
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <Card variant="analytics" className="lg:col-span-2">
              <CardHeader title="Salary distribution" description="Final salary outcomes after all simulations" />
              <SalaryHistogram data={result.salary_distribution} />
            </Card>
            <StabilityMeter
              score={result.stability_score}
              level={result.stability_level}
              explanation={result.stability_explanation}
            />
          </div>

          <Card variant="analytics">
            <CardHeader
              title="Salary growth curve"
              description="Median and percentile bands over time"
              action={
                <div className="flex items-center gap-2">
                  <span className="text-2xs text-muted">Year</span>
                  <input
                    type="range"
                    min={1}
                    max={result.years}
                    value={timelineYear}
                    onChange={(e) => setTimelineYear(Number(e.target.value))}
                    className="w-24"
                    aria-label="Timeline year"
                  />
                  <span className="text-2xs font-medium text-accent tabular-nums w-6">{timelineYear}</span>
                </div>
              }
            />
            <GrowthCurveChart data={result.growth_curve} highlightYear={timelineYear} />
            {yearSnapshot && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-line">
                <div>
                  <p className="text-2xs text-muted">Median at Y{timelineYear}</p>
                  <p className="text-sm font-semibold tabular-nums">₹{yearSnapshot.p50.toFixed(1)}L</p>
                </div>
                <div>
                  <p className="text-2xs text-muted">P10 – P90 range</p>
                  <p className="text-sm font-semibold tabular-nums">₹{yearSnapshot.p10.toFixed(0)}–{yearSnapshot.p90.toFixed(0)}L</p>
                </div>
                <div>
                  <p className="text-2xs text-muted">Mean</p>
                  <p className="text-sm font-semibold tabular-nums">₹{yearSnapshot.mean.toFixed(1)}L</p>
                </div>
              </div>
            )}
          </Card>

          <div className="grid lg:grid-cols-2 gap-4">
            <Card variant="analytics">
              <CardHeader title="Risk vs reward profile" />
              <RadarChartComponent metrics={result.radar_metrics} name={result.career_name} />
            </Card>
            <Card variant="analytics">
              <CardHeader title="Risk indicators" description="Derived from simulation runs" />
              <div className="space-y-4 mt-2">
                <RiskMeter
                  label="Career disruption probability"
                  value={result.probability_disruption}
                />
                {result.probability_insights.slice(0, 3).map((insight) => (
                  <RiskMeter
                    key={insight.label}
                    label={insight.label.replace('Probability of ', '').slice(0, 40)}
                    value={insight.probability}
                  />
                ))}
              </div>
            </Card>
          </div>

          <Card variant="analytics">
            <CardHeader
              title="Probability analytics"
              description={`All values from ${result.num_simulations.toLocaleString()} simulation runs`}
            />
            <ProbabilityChart insights={result.probability_insights} />
          </Card>

          {aiData && (
            <Card variant="analytics">
              <CardHeader title="AI disruption timeline" description={aiData.summary} />
              <AITimelineChart data={aiData.timeline} />
              <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-line">
                {aiData.recommended_skills.map((skill) => (
                  <Badge key={skill} variant="warning">{skill}</Badge>
                ))}
              </div>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  );
}
