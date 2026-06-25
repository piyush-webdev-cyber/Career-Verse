import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import {
  Code2,
  Calculator,
  Dna,
  Briefcase,
  Palette,
  Dice5,
  Scale,
  Home,
  Users,
  GraduationCap,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { recommendCareers } from '../services/api';
import { useCareers } from '../hooks/useCareers';
import { useApp } from '../context/AppContext';
import AssessmentSidebar, { QuestionSlider, MatchResultCard } from '../components/AssessmentPanel';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { LoadingState } from '../components/ui/EmptyState';
import type { QuestionnaireData } from '../types';

const QUESTIONS = [
  { key: 'interest_coding', label: 'Interest in coding', icon: Code2 },
  { key: 'interest_math', label: 'Interest in mathematics', icon: Calculator },
  { key: 'interest_biology', label: 'Interest in biology', icon: Dna },
  { key: 'interest_business', label: 'Interest in business', icon: Briefcase },
  { key: 'interest_creativity', label: 'Interest in creativity', icon: Palette },
  { key: 'risk_tolerance', label: 'Risk tolerance', icon: Dice5 },
  { key: 'work_life_balance', label: 'Work-life balance priority', icon: Scale },
  { key: 'remote_preference', label: 'Remote work preference', icon: Home },
  { key: 'leadership_interest', label: 'Leadership interest', icon: Users },
] as const;

const DEFAULT: QuestionnaireData = {
  name: 'Demo User',
  email: 'demo@careerverse.ai',
  interest_coding: 0,
  interest_math: 0,
  interest_biology: 0,
  interest_business: 0,
  interest_creativity: 0,
  risk_tolerance: 0,
  work_life_balance: 0,
  remote_preference: 0,
  leadership_interest: 0,
  years_to_study: 4,
};

export default function QuestionnairePage() {
  const [form, setForm] = useState<QuestionnaireData>(DEFAULT);
  const { setMatches, setUserId, setSelectedCareerId } = useApp();
  const { data: careers } = useCareers();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: recommendCareers,
    onSuccess: (data) => {
      setMatches(data.matches);
      setUserId(data.user_id);
    },
  });

  const progress = useMemo(() => {
    const fields = [...QUESTIONS.map((q) => q.key), 'years_to_study'] as const;
    const filled = fields.filter((k) => {
      const v = form[k as keyof QuestionnaireData];
      return typeof v === 'number' && v > 0;
    }).length;
    return (filled / fields.length) * 100;
  }, [form]);

  const updateField = (key: string, value: number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div>
      <PageHeader
        title="Career assessment"
        description="Map your interests and constraints. We'll compute compatibility scores against 11 career paths."
        badge={<span className="text-2xs text-muted">~3 min</span>}
      />

      {!mutation.isSuccess ? (
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Card variant="analytics">
              <CardHeader
                title="Questionnaire"
                description="Rate each dimension from 0 (low) to 10 (high)"
              />
              {QUESTIONS.map(({ key, label, icon }) => (
                <QuestionSlider
                  key={key}
                  label={label}
                  icon={icon}
                  value={form[key as keyof QuestionnaireData] as number}
                  onChange={(v) => updateField(key, v)}
                />
              ))}
              <QuestionSlider
                label="Years willing to study"
                icon={GraduationCap}
                value={form.years_to_study}
                onChange={(v) => updateField('years_to_study', v)}
                min={1}
                max={15}
              />
            </Card>

            <Button type="submit" disabled={mutation.isPending} className="w-full sm:w-auto">
              {mutation.isPending ? 'Analyzing profile...' : 'Generate recommendations'}
              {!mutation.isPending && <ArrowRight className="w-4 h-4" />}
            </Button>

            {mutation.isPending && <LoadingState text="Computing compatibility scores..." />}

            {mutation.isError && (
              <Card className="border-danger/30 bg-danger/5">
                <p className="text-sm text-danger">
                  Failed to get recommendations. Ensure the backend is running.
                </p>
              </Card>
            )}
          </form>

          <AssessmentSidebar form={form} progress={progress} />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Top career matches</h2>
              <p className="text-xs text-muted mt-0.5">Ranked by profile compatibility</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => mutation.reset()}>
              <RotateCcw className="w-3.5 h-3.5" />
              Retake
            </Button>
          </div>

          <div className="space-y-3">
            {mutation.data?.matches.map((match, i) => (
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

          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              const topMatch = mutation.data?.matches[0];
              const career = careers?.find((c) => c.name === topMatch?.career_name);
              if (career) setSelectedCareerId(career.id);
              navigate('/simulator');
            }}
          >
            Simulate top match
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
