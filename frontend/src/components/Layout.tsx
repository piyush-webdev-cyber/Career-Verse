import { useLocation } from 'react-router-dom';
import { cn } from '../lib/cn';
import PremiumNavbar from './navigation/PremiumNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <PremiumNavbar />

      <main
        className={cn(
          'flex-1 w-full min-w-0 pb-8 pt-2 sm:pt-4',
          !isHome && 'page-container',
        )}
      >
        {children}
      </main>

      <footer className="border-t border-nav py-6 mt-auto">
        <div className="page-container flex flex-col sm:flex-row items-center justify-between gap-2 text-2xs text-secondary">
          <span>CareerVerse AI &copy; {new Date().getFullYear()}</span>
          <span>Monte Carlo career intelligence</span>
        </div>
      </footer>
    </div>
  );
}
