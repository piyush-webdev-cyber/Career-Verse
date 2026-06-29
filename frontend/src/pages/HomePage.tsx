import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, BarChart3, GitCompare, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import HeroPreview from '../components/HeroPreview';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card, { CardHeader } from '../components/ui/Card';

const STATS = [
  { value: '10K', label: 'Simulations per run' },
  { value: '11', label: 'Career paths modeled' },
  { value: '15yr', label: 'Forecast horizon' },
];

const TRUST = ['Monte Carlo engine', 'AI disruption modeling', 'Probability analytics'];

const CAPABILITIES = [
  {
    icon: BarChart3,
    title: 'Monte Carlo simulation',
    description: '10,000 probabilistic outcomes across salary growth, promotions, recessions, and layoffs.',
    span: 'lg:col-span-2',
  },
  {
    icon: GitCompare,
    title: 'Parallel universe',
    description: 'Compare up to 3 careers across earnings, stability, and AI resistance.',
    span: '',
  },
  {
    icon: Shield,
    title: 'Stability scoring',
    description: 'Composite scores from demand, industry growth, and automation resistance.',
    span: '',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const startHref = isAuthenticated ? '/questionnaire' : '/signup';
  const simHref = isAuthenticated ? '/simulator' : '/login';

  return (
    <div className="page-container space-y-16 sm:space-y-20">
      <section className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-4 sm:pt-8">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={item}>
            <Badge variant="accent">Career intelligence platform</Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.15] tracking-tight text-balance"
          >
            Make career decisions with{' '}
            <span className="text-accent">probabilistic certainty</span>
          </motion.h1>

          <motion.p variants={item} className="text-sm sm:text-base text-muted max-w-lg leading-relaxed">
            Simulate thousands of future outcomes before you choose a path. Monte Carlo modeling,
            AI disruption forecasts, and side-by-side career comparisons — in one workspace.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3">
            <Link to={startHref}>
              <Button size="lg">
                {isAuthenticated ? 'Start assessment' : 'Get started free'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to={simHref}>
              <Button variant="secondary" size="lg">
                {isAuthenticated ? 'Run simulation' : 'Log in'}
              </Button>
            </Link>
          </motion.div>

          <motion.ul variants={item} className="flex flex-wrap gap-x-4 gap-y-2">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-1.5 text-2xs text-muted">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" strokeWidth={1.75} />
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="flex gap-8 pt-2 border-t border-line">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-lg font-semibold text-foreground tabular-nums">{value}</p>
                <p className="text-2xs text-secondary">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <HeroPreview />
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground tracking-tight">Platform capabilities</h2>
          <p className="text-sm text-muted mt-1">Built for high-stakes career decisions, not generic advice.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map(({ icon: Icon, title, description, span }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={span}
            >
              <Card hover className="h-full">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-accent" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{title}</h3>
                <p className="text-xs text-muted leading-relaxed">{description}</p>
              </Card>
            </motion.div>
          ))}
          <Card variant="analytics" className="lg:col-span-3">
            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {[
                { step: '01', title: 'Assess', desc: 'Map interests, risk tolerance, and constraints' },
                { step: '02', title: 'Simulate', desc: 'Run 10,000 Monte Carlo career trajectories' },
                { step: '03', title: 'Decide', desc: 'Compare paths with probability-backed insights' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="px-4 py-3 first:pl-0 last:pr-0 sm:py-0">
                  <span className="text-2xs font-mono text-accent">{step}</span>
                  <h4 className="text-sm font-semibold text-foreground mt-1">{title}</h4>
                  <p className="text-xs text-muted mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section>
        <Card variant="raised" padding="lg" className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <CardHeader
              title="Ready to explore your career futures?"
              description="Complete the assessment in under 3 minutes, then run your first simulation."
            />
          </div>
          <Link to={isAuthenticated ? '/questionnaire' : '/signup'} className="flex-shrink-0">
            <Button size="lg">
              {isAuthenticated ? 'Get started' : 'Sign up free'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}
