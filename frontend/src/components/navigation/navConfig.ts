import {
  BarChart3,
  ClipboardList,
  GitCompare,
  LayoutDashboard,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  path: string;
  label: string;
  subtitle: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  {
    path: '/questionnaire',
    label: 'Assessment',
    subtitle: 'Aptitude & career matching',
    icon: ClipboardList,
  },
  {
    path: '/simulator',
    label: 'Simulator',
    subtitle: 'Monte Carlo forecasting',
    icon: BarChart3,
  },
  {
    path: '/parallel',
    label: 'Compare',
    subtitle: 'Parallel universe paths',
    icon: GitCompare,
  },
  {
    path: '/dashboard',
    label: 'Dashboard',
    subtitle: 'Insights & run history',
    icon: LayoutDashboard,
  },
];

export const SEARCH_ROUTES = [
  { label: 'Home', path: '/', keywords: ['home', 'landing'] },
  ...NAV_ITEMS.map((item) => ({
    label: item.label,
    path: item.path,
    keywords: [item.label.toLowerCase(), item.subtitle.toLowerCase()],
  })),
];
