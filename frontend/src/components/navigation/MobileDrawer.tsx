import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Play, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { NAV_ITEMS } from './navConfig';
import NavbarBrand from './NavbarBrand';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-[2px] md:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            className="fixed right-0 top-0 z-[75] flex h-full w-[320px] max-w-[88vw] flex-col rounded-l-2xl border-l border-nav bg-[#0D0E12] shadow-2xl md:hidden"
            aria-label="Main menu"
          >
            <div className="flex items-start justify-between gap-3 px-5 pt-6 pb-4">
              <NavbarBrand mobile onClick={onClose} />
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-muted hover:bg-white/[0.06] hover:text-foreground transition-colors shrink-0"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mx-5 mb-4 h-px bg-nav" />

            <nav className="flex-1 overflow-y-auto px-3">
              {NAV_ITEMS.map(({ path, label, subtitle, icon: Icon }) => {
                const active = pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={onClose}
                    className={cn(
                      'group flex min-h-[56px] items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-200',
                      active ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-white/[0.04]',
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors',
                        active
                          ? 'border-primary/30 bg-primary/15 text-primary'
                          : 'border-nav bg-white/[0.02] text-muted group-hover:text-foreground',
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-medium leading-tight">{label}</p>
                      <p className="text-xs text-muted truncate">{subtitle}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted opacity-60" />
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-nav p-5 space-y-2.5">
              <Link
                to="/questionnaire"
                onClick={onClose}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-highlight text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
              >
                Start Assessment
              </Link>
              <Link
                to="/simulator"
                onClick={onClose}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-nav bg-white/[0.03] text-sm font-medium text-foreground transition-colors hover:bg-white/[0.06]"
              >
                <Play className="h-4 w-4" />
                Run Simulation
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
