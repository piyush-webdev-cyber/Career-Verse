import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { SEARCH_ROUTES } from './navConfig';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_ROUTES;
    return SEARCH_ROUTES.filter(
      (r) =>
        r.label.toLowerCase().includes(q) ||
        r.keywords.some((k) => k.includes(q)),
    );
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed left-1/2 top-[12%] z-[90] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-2xl border border-nav bg-nav-elevated/95 p-2 shadow-nav-elevated backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 px-3 py-2.5 border-b border-nav">
              <Search className="h-4 w-4 text-muted shrink-0" strokeWidth={1.75} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted hover:text-foreground hover:bg-white/[0.06] transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="max-h-64 overflow-y-auto py-2">
              {results.map((item) => (
                <li key={item.path}>
                  <button
                    type="button"
                    onClick={() => go(item.path)}
                    className={cn(
                      'w-full px-4 py-2.5 text-left text-sm text-foreground',
                      'hover:bg-white/[0.05] transition-colors rounded-lg mx-1 w-[calc(100%-0.5rem)]',
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              {results.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-muted">No results</li>
              )}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
