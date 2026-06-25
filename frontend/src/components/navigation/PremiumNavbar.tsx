import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/cn';
import { NAV_ITEMS } from './navConfig';
import { useNavbarScroll } from './useNavbarScroll';
import NavbarBrand from './NavbarBrand';
import MobileDrawer from './MobileDrawer';

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-xl',
        'text-muted hover:text-foreground hover:bg-white/[0.06]',
        'transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
      )}
    >
      {children}
    </button>
  );
}

function NavLinkDesktop({
  path,
  label,
  icon: Icon,
  active,
}: {
  path: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
}) {
  return (
    <Link
      to={path}
      className={cn(
        'group relative flex items-center gap-2 px-1 py-2',
        'text-[15px] font-medium transition-all duration-200 ease-out',
        'hover:-translate-y-0.5 hover:scale-[1.02]',
        active ? 'text-primary' : 'text-muted hover:text-foreground',
      )}
    >
      <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
      <span>{label}</span>
      <span
        className={cn(
          'absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full origin-left transition-transform duration-200',
          active
            ? 'scale-x-100 bg-gradient-to-r from-primary to-highlight'
            : 'scale-x-0 bg-gradient-to-r from-primary/60 to-highlight/60 group-hover:scale-x-100',
        )}
        aria-hidden
      />
    </Link>
  );
}

function NavLinkTablet({
  path,
  label,
  icon: Icon,
  active,
}: {
  path: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
}) {
  return (
    <Link
      to={path}
      title={label}
      className={cn(
        'relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200',
        'hover:-translate-y-0.5 hover:scale-[1.02]',
        active
          ? 'bg-primary/12 text-primary'
          : 'text-muted hover:text-foreground hover:bg-white/[0.06]',
      )}
    >
      <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
      {active && (
        <span className="absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-highlight" />
      )}
    </Link>
  );
}

export default function PremiumNavbar() {
  const { pathname } = useLocation();
  const scrolled = useNavbarScroll();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          'sticky top-0 z-50 w-full transition-[padding] duration-300 ease-out',
          scrolled ? 'pt-3' : 'pt-5',
        )}
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-5 xl:px-6">
          <motion.header
            layout
            className={cn(
              'relative flex items-center justify-between gap-3 rounded-2xl border px-3 sm:px-4 md:px-5',
              'border-nav bg-nav/75 backdrop-blur-[16px]',
              'shadow-nav transition-all duration-300 ease-out',
              scrolled
                ? 'h-[60px] bg-nav-scrolled/85 backdrop-blur-[20px] shadow-nav-scrolled'
                : 'h-[68px]',
            )}
          >
            <NavbarBrand scrolled={scrolled} mobile className="md:hidden" />
            <NavbarBrand scrolled={scrolled} className="hidden md:flex" />

            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 items-center xl:flex"
              style={{ gap: '40px' }}
              aria-label="Main"
            >
              {NAV_ITEMS.map((item) => (
                <NavLinkDesktop
                  key={item.path}
                  {...item}
                  active={pathname === item.path}
                />
              ))}
            </nav>

            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1.5 md:flex xl:hidden"
              aria-label="Main compact"
            >
              {NAV_ITEMS.map((item) => (
                <NavLinkTablet
                  key={item.path}
                  {...item}
                  active={pathname === item.path}
                />
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-1.5">
              <Link
                to="/questionnaire"
                className={cn(
                  'hidden md:inline-flex h-10 items-center justify-center rounded-xl px-4',
                  'bg-gradient-to-r from-primary to-highlight text-sm font-semibold text-white',
                  'shadow-lg shadow-primary/20 transition-all duration-200 ease-out',
                  'hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]',
                  'lg:px-5',
                )}
              >
                <span className="hidden lg:inline">Start Assessment</span>
                <span className="lg:hidden">Start</span>
              </Link>

              <div className="flex items-center md:hidden">
                <IconButton label="Open menu" onClick={() => setDrawerOpen(true)}>
                  <Menu className="h-5 w-5" strokeWidth={1.75} />
                </IconButton>
              </div>
            </div>
          </motion.header>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
