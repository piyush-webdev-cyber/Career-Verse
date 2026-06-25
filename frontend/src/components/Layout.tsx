import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ClipboardList,
  GitCompare,
  Sparkles,
  BarChart3,
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Sparkles },
  { path: '/questionnaire', label: 'Assessment', icon: ClipboardList },
  { path: '/simulator', label: 'Simulator', icon: BarChart3 },
  { path: '/parallel', label: 'Parallel Universe', icon: GitCompare },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass-card border-b border-surface-border rounded-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-white leading-tight">
                  CareerVerse AI
                </h1>
                <p className="text-[10px] text-slate-400 leading-tight hidden sm:block">
                  Simulate Your Future Before You Choose It.
                </p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
                const active = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-indigo-500/15 border border-indigo-500/30 rounded-lg"
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <nav className="md:hidden flex overflow-x-auto gap-1 px-4 pb-3 scrollbar-none">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                  active
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="border-t border-surface-border py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
          CareerVerse AI &copy; {new Date().getFullYear()} &mdash; Monte Carlo Career Intelligence Platform
        </div>
      </footer>
    </div>
  );
}
