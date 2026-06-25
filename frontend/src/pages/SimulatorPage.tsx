import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown, Activity, Target, Play } from 'lucide-react';
import { useCareers } from '../hooks/useCareers';
import { useSimulation } from '../hooks/useSimulation';
import { getAIDisruption } from '../services/api';
import { useApp } from '../context/AppContext';
import StabilityMeter, { RiskMeter } from '../components/StabilityMeter';
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
  const { userId, lastSimulation, setLastSimulation, selectedCareerId, setSelectedCareerId } = useApp();
  const [careerId, setCareerId] = useState<number | null>(selectedCareerId);
  const [timelineYear, setTimelineYear] = useState(15);
  const simulation = useSimulation(userId);

  const selectedCareer = careers?.find((c) => c.id === careerId);

  const { data: aiData } = useQuery({
    queryKey: ['ai-disruption', selectedCareer?.name],
    queryFn: () => getAIDisruption(selectedCareer!.name),
    enabled: !!selectedCareer?.name,
  });

  useEffect(() => {
    if (selectedCareerId && !careerId) setCareerId(selectedCareerId);
  }, [selectedCareerId, careerId]);

  const handleSimulate = () => {
    if (!careerId) return;
    setSelectedCareerId(careerId);
    simulation.mutate(careerId, {
      onSuccess: (data) => {
        setLastSimulation(data);
        setTimelineYear(data.years);
      },
    });
  };

  const result = simulation.data ?? lastSimulation;

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
            onChange={(e) => setCareerId(Number(e.target.value))}
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
          </Select>
          <div className="flex items-stretch sm:items-end w-full sm:w-auto shrink-0">
            <Button
              onClick={handleSimulate}
              disabled={!careerId || simulation.isPending}
              className="w-full sm:w-auto justify-center"
            >
              <Play className="w-3.5 h-3.5" />
              {simulation.isPending ? 'Running...' : 'Run simulation'}
            </Button>
          </div>
        </div>
      </Card>

      {simulation.isPending && <LoadingState text="Processing 10,000 Monte Carlo simulations..." />}

      {simulation.isError && (
        <Card className="border-danger/30 bg-danger/5">
          <p className="text-sm text-danger">Simulation failed. Ensure the backend is running.</p>
        </Card>
      )}

      {result && !simulation.isPending && (
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
