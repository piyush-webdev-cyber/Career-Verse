import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3,
  GitCompare,
  Brain,
  Shield,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const FEATURES = [
  {
    icon: BarChart3,
    title: 'Monte Carlo Simulation',
    description: '10,000 probabilistic career outcomes simulated over 15 years with real salary distributions.',
    color: 'text-indigo-400',
  },
  {
    icon: GitCompare,
    title: 'Parallel Universe',
    description: 'Compare up to 3 career paths side-by-side across earnings, stability, and AI risk.',
    color: 'text-emerald-400',
  },
  {
    icon: Brain,
    title: 'AI Disruption Forecast',
    description: 'Timeline projections from 2026–2040 showing automation exposure and upskilling paths.',
    color: 'text-amber-400',
  },
  {
    icon: Shield,
    title: 'Stability Analytics',
    description: 'Composite stability scores based on demand, industry growth, and automation resistance.',
    color: 'text-pink-400',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="text-center pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Career Intelligence Platform
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Simulate Your Future
            <br />
            <span className="gradient-text">Before You Choose It</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            CareerVerse AI uses Monte Carlo simulations, risk modeling, and AI disruption
            forecasting to help you make data-driven career decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/questionnaire" className="btn-primary inline-flex items-center justify-center gap-2">
              Start Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/simulator" className="btn-secondary inline-flex items-center justify-center gap-2">
              Run Simulation
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="glass-card-hover p-6"
          >
            <feature.icon className={`w-8 h-8 ${feature.color} mb-4`} />
            <h3 className="font-display font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      <section className="glass-card p-8 text-center">
        <h2 className="font-display text-2xl font-bold text-white mb-3">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {[
            { step: '01', title: 'Assess', desc: 'Complete the career compatibility questionnaire' },
            { step: '02', title: 'Simulate', desc: 'Run 10,000 Monte Carlo career outcome simulations' },
            { step: '03', title: 'Decide', desc: 'Compare paths with probability analytics and AI forecasts' },
          ].map((item) => (
            <div key={item.step}>
              <div className="text-3xl font-display font-bold gradient-text mb-2">{item.step}</div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
