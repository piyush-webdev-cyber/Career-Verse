import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  FileText,
  BarChart3,
  Target,
  User,
  ArrowRight,
  Clock,
  Sparkles,
  Activity,
} from 'lucide-react';
import { getDashboard } from '../services/api';
import { useApp } from '../context/AppContext';
import { MatchResultCard } from '../components/AssessmentPanel';
import PageHeader, { Section } from '../components/ui/PageHeader';
import Card, { CardHeader } from '../components/ui/Card';
import KpiCard from '../components/ui/KpiCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EmptyState, { LoadingState } from '../components/ui/EmptyState';
import Progress from '../components/ui/Progress';

export default function DashboardPage() {
  const { userId, matches } = useApp();

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard', userId],
    queryFn: () => getDashboard(userId),
  });

  const displayMatches = matches.length > 0 ? matches : (data?.career_matches ?? []);

  if (isLoading) return <LoadingState text="Loading dashboard..." />;

  if (error) {
    return (
      <Card className="border-danger/30 bg-danger/5">
        <p className="text-sm text-danger">Failed to load dashboard. Ensure the backend is running.</p>
      </Card>
    );
  }

  const latestSim = data?.simulations[0];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Your career intelligence workspace — matches, simulations, and insights."
        action={
          <Link to="/questionnaire">
            <Button variant="secondary" size="sm">
              New assessment
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="Saved reports" value={String(data?.saved_reports_count ?? 0)} icon={FileText} layout="horizontal" />
        <KpiCard label="Career matches" value={String(displayMatches.length)} icon={Target} layout="horizontal" />
        <KpiCard label="Simulations" value={String(data?.simulations.length ?? 0)} icon={BarChart3} layout="horizontal" />
        <KpiCard
          label="Latest stability"
          value={latestSim ? `${latestSim.stability_score.toFixed(0)}` : '—'}
          icon={Activity}
          layout="horizontal"
          change={latestSim?.career_name}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card variant="analytics" className="lg:col-span-2">
          <CardHeader
            title="Profile"
            action={<User className="w-4 h-4 text-secondary" strokeWidth={1.75} />}
          />
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-2xs text-muted uppercase tracking-wider mb-1">Name</p>
              <p className="text-sm font-medium text-foreground">{data?.user.name}</p>
            </div>
            <div>
              <p className="text-2xs text-muted uppercase tracking-wider mb-1">Email</p>
              <p className="text-sm font-medium text-foreground">{data?.user.email}</p>
            </div>
          </div>
          {displayMatches.length === 0 && (
            <div className="mt-6 pt-6 border-t border-line">
              <p className="text-xs text-muted mb-3">No assessment completed yet.</p>
              <Link to="/questionnaire">
                <Button size="sm">Start assessment</Button>
              </Link>
            </div>
          )}
        </Card>

        <Card variant="analytics">
          <CardHeader title="AI recommendations" />
          {displayMatches.length > 0 ? (
            <div className="space-y-3">
              {displayMatches.slice(0, 3).map((m, i) => (
                <div key={m.career_name} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{m.career_name}</p>
                    <Progress value={m.match_percentage} size="sm" className="mt-1.5" />
                  </div>
                  <Badge variant={i === 0 ? 'accent' : 'default'}>{m.match_percentage}%</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted">Complete the assessment to see recommendations.</p>
          )}
        </Card>
      </div>

      <Section title="Career matches" description="Ranked by compatibility">
        {displayMatches.length > 0 ? (
          <div className="space-y-2">
            {displayMatches.map((match, i) => (
              <MatchResultCard
                key={match.career_name}
                rank={i + 1}
                name={match.career_name}
                match={match.match_percentage}
                reasoning={match.reasoning}
                salary={match.avg_starting_salary}
                education={match.education_years}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No matches yet"
            description="Complete the career assessment to discover your top paths."
            action={
              <Link to="/questionnaire">
                <Button size="sm">Take assessment</Button>
              </Link>
            }
          />
        )}
      </Section>

      <Section title="Recent simulations" description="Monte Carlo run history">
        {data?.simulations && data.simulations.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-3">
            {data.simulations.map((sim, i) => (
              <motion.div
                key={sim.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card hover padding="sm">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{sim.career_name}</h3>
                      <p className="text-2xs text-secondary flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {new Date(sim.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="success">{sim.stability_score.toFixed(0)} stable</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2 rounded-lg bg-white/[0.03]">
                      <p className="text-2xs text-muted">Avg</p>
                      <p className="text-sm font-semibold tabular-nums">₹{sim.average_salary.toFixed(0)}L</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.03]">
                      <p className="text-2xs text-muted">Best</p>
                      <p className="text-sm font-semibold text-success tabular-nums">₹{sim.best_case.toFixed(0)}L</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.03]">
                      <p className="text-2xs text-muted">Worst</p>
                      <p className="text-sm font-semibold text-danger tabular-nums">₹{sim.worst_case.toFixed(0)}L</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3 pt-3 border-t border-line text-2xs text-muted">
                    <span>P(&gt;₹20L): <strong className="text-foreground">{sim.probability_20L.toFixed(0)}%</strong></span>
                    <span>P(&gt;₹50L): <strong className="text-foreground">{sim.probability_50L.toFixed(0)}%</strong></span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No simulations yet"
            description="Run the Monte Carlo simulator to see probabilistic outcomes here."
            action={
              <Link to="/simulator">
                <Button size="sm">Open simulator</Button>
              </Link>
            }
          />
        )}
      </Section>

      <Card variant="ghost" padding="sm" className="flex items-center gap-3">
        <Sparkles className="w-4 h-4 text-accent flex-shrink-0" strokeWidth={1.75} />
        <p className="text-xs text-muted flex-1">
          Career insights update automatically as you complete assessments and run simulations.
        </p>
        <Link to="/parallel">
          <Button variant="ghost" size="sm">Compare paths</Button>
        </Link>
      </Card>
    </div>
  );
}
