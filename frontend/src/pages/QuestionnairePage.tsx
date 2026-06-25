import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { recommendCareers } from '../services/api';
import { useCareers } from '../hooks/useCareers';
import { useApp } from '../context/AppContext';
import CareerCard from '../components/CareerCard';
import LoadingSpinner from '../components/LoadingSpinner';
import type { QuestionnaireData } from '../types';

const QUESTIONS = [
  { key: 'interest_coding', label: 'Interest in Coding', icon: '💻' },
  { key: 'interest_math', label: 'Interest in Mathematics', icon: '📐' },
  { key: 'interest_biology', label: 'Interest in Biology', icon: '🧬' },
  { key: 'interest_business', label: 'Interest in Business', icon: '📊' },
  { key: 'interest_creativity', label: 'Interest in Creativity', icon: '🎨' },
  { key: 'risk_tolerance', label: 'Risk Tolerance', icon: '🎲' },
  { key: 'work_life_balance', label: 'Desired Work-Life Balance', icon: '⚖️' },
  { key: 'remote_preference', label: 'Preference for Remote Work', icon: '🏠' },
  { key: 'leadership_interest', label: 'Leadership Interest', icon: '👥' },
] as const;

const DEFAULT: QuestionnaireData = {
  name: 'Demo User',
  email: 'demo@careerverse.ai',
  interest_coding: 5,
  interest_math: 5,
  interest_biology: 5,
  interest_business: 5,
  interest_creativity: 5,
  risk_tolerance: 5,
  work_life_balance: 5,
  remote_preference: 5,
  leadership_interest: 5,
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

  const updateField = (key: string, value: number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Career Assessment
        </h1>
        <p className="text-slate-400 mb-8">
          Answer these questions to discover your top 5 career matches with compatibility scores.
        </p>
      </motion.div>

      {!mutation.isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-6 space-y-6">
            {QUESTIONS.map(({ key, label, icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">
                    <span className="mr-2">{icon}</span>
                    {label}
                  </label>
                  <span className="text-sm font-bold text-indigo-400 w-8 text-right">
                    {form[key as keyof QuestionnaireData]}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={form[key as keyof QuestionnaireData] as number}
                  onChange={(e) => updateField(key, Number(e.target.value))}
                  className="input-range"
                />
                <div className="flex justify-between text-xs text-slate-600 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </motion.div>
            ))}

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">
                  <span className="mr-2">📚</span>
                  Years Willing to Study
                </label>
                <span className="text-sm font-bold text-indigo-400">{form.years_to_study}</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={form.years_to_study}
                onChange={(e) => updateField('years_to_study', Number(e.target.value))}
                className="input-range"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn-primary w-full"
          >
            {mutation.isPending ? 'Analyzing...' : 'Get Career Recommendations'}
          </button>

          {mutation.isPending && <LoadingSpinner text="Computing compatibility scores..." />}

          {mutation.isError && (
            <div className="glass-card p-4 border-red-500/30 text-red-400 text-sm">
              Failed to get recommendations. Ensure the backend is running on port 8000.
            </div>
          )}
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-white">
              Your Top 5 Career Matches
            </h2>
            <button
              onClick={() => mutation.reset()}
              className="btn-secondary text-sm py-2 px-4"
            >
              Retake
            </button>
          </div>

          {mutation.data?.matches.map((match, i) => (
            <CareerCard key={match.career_name} match={match} rank={i + 1} />
          ))}

          <button
            onClick={() => {
              const topMatch = mutation.data?.matches[0];
              const career = careers?.find((c) => c.name === topMatch?.career_name);
              if (career) setSelectedCareerId(career.id);
              navigate('/simulator');
            }}
            className="btn-primary w-full mt-6"
          >
            Simulate Top Career Path
          </button>
        </motion.div>
      )}
    </div>
  );
}
