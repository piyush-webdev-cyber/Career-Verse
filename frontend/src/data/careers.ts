import type { LucideIcon } from 'lucide-react';
import {
  Cpu,
  Brain,
  CircuitBoard,
  BarChart3,
  LineChart,
  Cloud,
  Settings,
  Shield,
  Blocks,
  Smartphone,
  Globe,
  Gamepad2,
  Microchip,
  Bot,
  Bug,
  Layout,
  Palette,
  PenTool,
  FileText,
  Stethoscope,
  Scissors,
  Smile,
  Pill,
  HeartPulse,
  Activity,
  BrainCircuit,
  Apple,
  PawPrint,
  Calculator,
  Landmark,
  Coins,
  ClipboardCheck,
  TrendingUp,
  Sigma,
  Receipt,
  Rocket,
  Briefcase,
  Megaphone,
  Handshake,
  Users,
  Building2,
  Lightbulb,
  Paintbrush,
  Clapperboard,
  Film,
  Camera,
  Shirt,
  Sofa,
  Music,
  GraduationCap,
  BookOpen,
  Microscope,
  Presentation,
  Scale,
  Gavel,
  Building,
  HardHat,
  Plane,
  RadioTower,
  Wrench,
  Armchair,
  Atom,
  FlaskConical,
  Dna,
  Telescope,
  ChefHat,
  Hotel,
  PartyPopper,
  Home,
  Share2,
  Video,
  Star,
  Youtube,
  MessageCircle,
  Dumbbell,
  Trophy,
  Medal,
} from 'lucide-react';

export type CareerCategory =
  | 'Technology'
  | 'Medical'
  | 'Finance'
  | 'Business'
  | 'Creative'
  | 'Education'
  | 'Government'
  | 'Aviation'
  | 'Science'
  | 'Sports'
  | 'Others';

export const CAREER_CATEGORIES: Array<'All' | CareerCategory> = [
  'All',
  'Technology',
  'Medical',
  'Finance',
  'Business',
  'Creative',
  'Education',
  'Government',
  'Aviation',
  'Science',
  'Sports',
  'Others',
];

export interface CompareCareerOption {
  id: number;
  name: string;
  averageSalary: number;
  educationYears: number;
  category: CareerCategory;
  icon: string;
  /** Optional notes for custom careers */
  notes?: string;
  isCustom?: boolean;
  /** Metrics for client-side comparison */
  growthRate?: number;
  stress?: number;
  flexibility?: number;
  remote?: number;
  aiRisk?: number;
  demand?: number;
}

/** Map icon keys → Lucide components for rendering */
export const CAREER_ICONS: Record<string, LucideIcon> = {
  cpu: Cpu,
  brain: Brain,
  circuit: CircuitBoard,
  chart: BarChart3,
  linechart: LineChart,
  cloud: Cloud,
  settings: Settings,
  shield: Shield,
  blocks: Blocks,
  phone: Smartphone,
  globe: Globe,
  game: Gamepad2,
  chip: Microchip,
  bot: Bot,
  bug: Bug,
  layout: Layout,
  palette: Palette,
  pen: PenTool,
  file: FileText,
  stethoscope: Stethoscope,
  scissors: Scissors,
  smile: Smile,
  pill: Pill,
  heart: HeartPulse,
  activity: Activity,
  braincircuit: BrainCircuit,
  apple: Apple,
  paw: PawPrint,
  calc: Calculator,
  landmark: Landmark,
  coins: Coins,
  clipboard: ClipboardCheck,
  trending: TrendingUp,
  sigma: Sigma,
  receipt: Receipt,
  rocket: Rocket,
  briefcase: Briefcase,
  megaphone: Megaphone,
  handshake: Handshake,
  users: Users,
  building: Building2,
  lightbulb: Lightbulb,
  paintbrush: Paintbrush,
  clapper: Clapperboard,
  film: Film,
  camera: Camera,
  shirt: Shirt,
  sofa: Sofa,
  music: Music,
  graduation: GraduationCap,
  book: BookOpen,
  microscope: Microscope,
  presentation: Presentation,
  scale: Scale,
  gavel: Gavel,
  gov: Building,
  hardhat: HardHat,
  plane: Plane,
  radio: RadioTower,
  wrench: Wrench,
  armchair: Armchair,
  atom: Atom,
  flask: FlaskConical,
  dna: Dna,
  telescope: Telescope,
  chef: ChefHat,
  hotel: Hotel,
  party: PartyPopper,
  home: Home,
  share: Share2,
  video: Video,
  star: Star,
  youtube: Youtube,
  message: MessageCircle,
  dumbbell: Dumbbell,
  trophy: Trophy,
  medal: Medal,
};

function c(
  id: number,
  name: string,
  averageSalary: number,
  educationYears: number,
  category: CareerCategory,
  icon: string,
  extras?: Partial<CompareCareerOption>
): CompareCareerOption {
  return {
    id,
    name,
    averageSalary,
    educationYears,
    category,
    icon,
    growthRate: extras?.growthRate ?? 0.1,
    stress: extras?.stress ?? 6,
    flexibility: extras?.flexibility ?? 6,
    remote: extras?.remote ?? 5,
    aiRisk: extras?.aiRisk ?? 0.3,
    demand: extras?.demand ?? 75,
    ...extras,
  };
}

export const BUILTIN_CAREERS: CompareCareerOption[] = [
  // Technology
  c(1, 'Software Engineer', 10, 4, 'Technology', 'cpu', { growthRate: 0.12, remote: 9, aiRisk: 0.35, demand: 92 }),
  c(2, 'AI Engineer', 15, 5, 'Technology', 'brain', { growthRate: 0.16, remote: 8, aiRisk: 0.3, demand: 95 }),
  c(3, 'ML Engineer', 14, 5, 'Technology', 'circuit', { growthRate: 0.15, remote: 8, aiRisk: 0.32, demand: 93 }),
  c(4, 'Data Scientist', 12, 5, 'Technology', 'chart', { growthRate: 0.14, remote: 8.5, aiRisk: 0.4, demand: 88 }),
  c(5, 'Data Analyst', 8, 3, 'Technology', 'linechart', { growthRate: 0.1, remote: 8, aiRisk: 0.45, demand: 85 }),
  c(6, 'Cloud Engineer', 12, 4, 'Technology', 'cloud', { growthRate: 0.13, remote: 9, aiRisk: 0.28, demand: 90 }),
  c(7, 'DevOps Engineer', 11, 4, 'Technology', 'settings', { growthRate: 0.12, remote: 8.5, aiRisk: 0.3, demand: 88 }),
  c(8, 'Cybersecurity Engineer', 11, 4, 'Technology', 'shield', { growthRate: 0.13, remote: 7, aiRisk: 0.2, demand: 93 }),
  c(9, 'Blockchain Developer', 13, 4, 'Technology', 'blocks', { growthRate: 0.14, remote: 9, aiRisk: 0.25, demand: 72 }),
  c(10, 'Mobile App Developer', 9, 4, 'Technology', 'phone', { growthRate: 0.11, remote: 8, aiRisk: 0.35, demand: 82 }),
  c(11, 'Web Developer', 7, 3, 'Technology', 'globe', { growthRate: 0.1, remote: 9, aiRisk: 0.4, demand: 80 }),
  c(12, 'Game Developer', 8, 4, 'Technology', 'game', { growthRate: 0.09, remote: 6, stress: 7, demand: 70 }),
  c(13, 'Embedded Engineer', 10, 4, 'Technology', 'chip', { growthRate: 0.1, remote: 4, aiRisk: 0.25, demand: 78 }),
  c(14, 'Robotics Engineer', 11, 5, 'Technology', 'bot', { growthRate: 0.12, remote: 3, aiRisk: 0.22, demand: 80 }),
  c(15, 'QA Engineer', 7, 3, 'Technology', 'bug', { growthRate: 0.08, remote: 8, aiRisk: 0.5, demand: 75 }),
  c(16, 'Product Manager', 14, 4, 'Technology', 'layout', { growthRate: 0.13, remote: 7.5, aiRisk: 0.3, demand: 85 }),
  c(17, 'UI Designer', 8, 3, 'Technology', 'palette', { growthRate: 0.1, remote: 8.5, aiRisk: 0.38, demand: 80 }),
  c(18, 'UX Designer', 8, 4, 'Technology', 'pen', { growthRate: 0.11, remote: 8.5, aiRisk: 0.35, demand: 82 }),
  c(19, 'Technical Writer', 6, 3, 'Technology', 'file', { growthRate: 0.07, remote: 9, aiRisk: 0.45, demand: 68 }),

  // Medical
  c(20, 'Doctor', 8, 10, 'Medical', 'stethoscope', { growthRate: 0.08, remote: 2, stress: 9, aiRisk: 0.15, demand: 90 }),
  c(21, 'Surgeon', 18, 12, 'Medical', 'scissors', { growthRate: 0.07, remote: 1, stress: 9.5, aiRisk: 0.12, demand: 88 }),
  c(22, 'Dentist', 10, 6, 'Medical', 'smile', { growthRate: 0.07, remote: 1, stress: 7, aiRisk: 0.18, demand: 82 }),
  c(23, 'Pharmacist', 6, 5, 'Medical', 'pill', { growthRate: 0.06, remote: 2, stress: 5, aiRisk: 0.35, demand: 78 }),
  c(24, 'Nurse', 4.5, 4, 'Medical', 'heart', { growthRate: 0.06, remote: 1, stress: 8, aiRisk: 0.15, demand: 92 }),
  c(25, 'Physiotherapist', 5, 4, 'Medical', 'activity', { growthRate: 0.07, remote: 3, stress: 5, aiRisk: 0.2, demand: 80 }),
  c(26, 'Psychologist', 7, 6, 'Medical', 'braincircuit', { growthRate: 0.08, remote: 6, stress: 6, aiRisk: 0.22, demand: 85 }),
  c(27, 'Nutritionist', 5, 4, 'Medical', 'apple', { growthRate: 0.08, remote: 7, stress: 4, aiRisk: 0.3, demand: 75 }),
  c(28, 'Veterinarian', 7, 6, 'Medical', 'paw', { growthRate: 0.07, remote: 1, stress: 7, aiRisk: 0.2, demand: 76 }),

  // Finance
  c(29, 'Chartered Accountant', 7, 5, 'Finance', 'calc', { growthRate: 0.09, remote: 5, stress: 7.5, aiRisk: 0.55, demand: 75 }),
  c(30, 'Investment Banker', 18, 4, 'Finance', 'landmark', { growthRate: 0.12, remote: 3, stress: 9, aiRisk: 0.35, demand: 70 }),
  c(31, 'Financial Analyst', 9, 4, 'Finance', 'coins', { growthRate: 0.1, remote: 6, stress: 6, aiRisk: 0.4, demand: 80 }),
  c(32, 'Auditor', 6, 4, 'Finance', 'clipboard', { growthRate: 0.07, remote: 4, stress: 6, aiRisk: 0.5, demand: 72 }),
  c(33, 'Stock Trader', 8, 2, 'Finance', 'trending', { growthRate: 0.15, remote: 8, stress: 9, aiRisk: 0.45, demand: 60 }),
  c(34, 'Actuary', 12, 5, 'Finance', 'sigma', { growthRate: 0.09, remote: 5, stress: 6, aiRisk: 0.35, demand: 78 }),
  c(35, 'Tax Consultant', 7, 4, 'Finance', 'receipt', { growthRate: 0.08, remote: 6, stress: 6, aiRisk: 0.48, demand: 74 }),

  // Business
  c(36, 'Entrepreneur', 5, 3, 'Business', 'rocket', { growthRate: 0.2, remote: 8, stress: 9.5, aiRisk: 0.25, demand: 60 }),
  c(37, 'Business Analyst', 9, 4, 'Business', 'briefcase', { growthRate: 0.1, remote: 7, stress: 5.5, aiRisk: 0.35, demand: 82 }),
  c(38, 'Marketing Manager', 10, 4, 'Business', 'megaphone', { growthRate: 0.1, remote: 6, stress: 6.5, aiRisk: 0.35, demand: 80 }),
  c(39, 'Sales Manager', 8, 3, 'Business', 'handshake', { growthRate: 0.09, remote: 4, stress: 7, aiRisk: 0.3, demand: 78 }),
  c(40, 'HR Manager', 8, 4, 'Business', 'users', { growthRate: 0.08, remote: 5, stress: 5.5, aiRisk: 0.32, demand: 76 }),
  c(41, 'Operations Manager', 10, 4, 'Business', 'building', { growthRate: 0.09, remote: 4, stress: 7, aiRisk: 0.28, demand: 80 }),
  c(42, 'Consultant', 12, 4, 'Business', 'lightbulb', { growthRate: 0.11, remote: 6, stress: 7.5, aiRisk: 0.3, demand: 82 }),

  // Creative
  c(43, 'Graphic Designer', 5, 3, 'Creative', 'paintbrush', { growthRate: 0.08, remote: 8, stress: 5, aiRisk: 0.45, demand: 72 }),
  c(44, 'Animator', 6, 4, 'Creative', 'clapper', { growthRate: 0.09, remote: 6, stress: 6, aiRisk: 0.4, demand: 70 }),
  c(45, 'Video Editor', 5, 2, 'Creative', 'film', { growthRate: 0.1, remote: 8, stress: 5.5, aiRisk: 0.42, demand: 78 }),
  c(46, 'Film Director', 8, 4, 'Creative', 'camera', { growthRate: 0.08, remote: 2, stress: 8, aiRisk: 0.2, demand: 55 }),
  c(47, 'Photographer', 4, 2, 'Creative', 'camera', { growthRate: 0.07, remote: 5, stress: 5, aiRisk: 0.35, demand: 65 }),
  c(48, 'Fashion Designer', 6, 4, 'Creative', 'shirt', { growthRate: 0.08, remote: 3, stress: 6, aiRisk: 0.3, demand: 68 }),
  c(49, 'Interior Designer', 5, 3, 'Creative', 'sofa', { growthRate: 0.08, remote: 4, stress: 5, aiRisk: 0.32, demand: 70 }),
  c(50, 'Music Producer', 5, 2, 'Creative', 'music', { growthRate: 0.09, remote: 7, stress: 6, aiRisk: 0.35, demand: 62 }),

  // Education
  c(51, 'Teacher', 4.5, 4, 'Education', 'graduation', { growthRate: 0.05, remote: 5, stress: 6, aiRisk: 0.25, demand: 80 }),
  c(52, 'Professor', 10, 8, 'Education', 'book', { growthRate: 0.06, remote: 4, stress: 5, aiRisk: 0.22, demand: 70 }),
  c(53, 'Research Scientist', 9, 8, 'Education', 'microscope', { growthRate: 0.08, remote: 4, stress: 6, aiRisk: 0.25, demand: 75 }),
  c(54, 'Lecturer', 6, 5, 'Education', 'presentation', { growthRate: 0.05, remote: 5, stress: 5, aiRisk: 0.28, demand: 72 }),

  // Government
  c(55, 'IAS Officer', 12, 5, 'Government', 'gov', { growthRate: 0.06, remote: 1, stress: 8, aiRisk: 0.15, demand: 65 }),
  c(56, 'IPS Officer', 11, 5, 'Government', 'shield', { growthRate: 0.06, remote: 1, stress: 8.5, aiRisk: 0.12, demand: 65 }),
  c(57, 'IFS Officer', 12, 5, 'Government', 'globe', { growthRate: 0.06, remote: 2, stress: 7, aiRisk: 0.15, demand: 60 }),
  c(58, 'Judge', 15, 8, 'Government', 'gavel', { growthRate: 0.05, remote: 1, stress: 7, aiRisk: 0.18, demand: 70 }),
  c(59, 'Lawyer', 6, 6, 'Government', 'scale', { growthRate: 0.07, remote: 4, stress: 8, aiRisk: 0.45, demand: 70 }),
  c(60, 'Civil Engineer', 6, 4, 'Government', 'hardhat', { growthRate: 0.07, remote: 2, stress: 6, aiRisk: 0.25, demand: 78 }),
  c(61, 'Architect', 7, 5, 'Government', 'building', { growthRate: 0.08, remote: 4, stress: 6, aiRisk: 0.3, demand: 75 }),

  // Aviation
  c(62, 'Pilot', 20, 4, 'Aviation', 'plane', { growthRate: 0.08, remote: 1, stress: 8, aiRisk: 0.2, demand: 72 }),
  c(63, 'Air Traffic Controller', 12, 3, 'Aviation', 'radio', { growthRate: 0.06, remote: 1, stress: 9, aiRisk: 0.25, demand: 70 }),
  c(64, 'Aircraft Engineer', 9, 4, 'Aviation', 'wrench', { growthRate: 0.07, remote: 1, stress: 6, aiRisk: 0.22, demand: 74 }),
  c(65, 'Cabin Crew', 4, 1, 'Aviation', 'armchair', { growthRate: 0.05, remote: 1, stress: 6, aiRisk: 0.2, demand: 68 }),

  // Science
  c(66, 'Physicist', 8, 8, 'Science', 'atom', { growthRate: 0.07, remote: 4, stress: 5, aiRisk: 0.2, demand: 65 }),
  c(67, 'Chemist', 7, 5, 'Science', 'flask', { growthRate: 0.07, remote: 2, stress: 5, aiRisk: 0.25, demand: 70 }),
  c(68, 'Biotechnologist', 8, 5, 'Science', 'dna', { growthRate: 0.1, remote: 3, stress: 5.5, aiRisk: 0.28, demand: 78 }),
  c(69, 'Astronomer', 7, 8, 'Science', 'telescope', { growthRate: 0.06, remote: 3, stress: 4, aiRisk: 0.18, demand: 55 }),

  // Sports
  c(70, 'Fitness Trainer', 4, 2, 'Sports', 'dumbbell', { growthRate: 0.08, remote: 3, stress: 4, aiRisk: 0.2, demand: 80 }),
  c(71, 'Sports Coach', 5, 3, 'Sports', 'trophy', { growthRate: 0.07, remote: 2, stress: 5, aiRisk: 0.15, demand: 72 }),
  c(72, 'Athlete', 6, 2, 'Sports', 'medal', { growthRate: 0.1, remote: 1, stress: 7, aiRisk: 0.1, demand: 50 }),

  // Others
  c(73, 'Chef', 5, 3, 'Others', 'chef', { growthRate: 0.07, remote: 1, stress: 8, aiRisk: 0.2, demand: 75 }),
  c(74, 'Hotel Manager', 7, 3, 'Others', 'hotel', { growthRate: 0.07, remote: 1, stress: 7, aiRisk: 0.25, demand: 72 }),
  c(75, 'Event Manager', 5, 2, 'Others', 'party', { growthRate: 0.08, remote: 3, stress: 7, aiRisk: 0.25, demand: 70 }),
  c(76, 'Real Estate Agent', 6, 1, 'Others', 'home', { growthRate: 0.1, remote: 5, stress: 6, aiRisk: 0.3, demand: 74 }),
  c(77, 'Digital Marketer', 6, 2, 'Others', 'share', { growthRate: 0.11, remote: 9, stress: 5, aiRisk: 0.4, demand: 85 }),
  c(78, 'Content Creator', 4, 1, 'Others', 'video', { growthRate: 0.15, remote: 9, stress: 6, aiRisk: 0.35, demand: 78 }),
  c(79, 'Influencer', 5, 1, 'Others', 'star', { growthRate: 0.18, remote: 9, stress: 6, aiRisk: 0.3, demand: 65 }),
  c(80, 'YouTuber', 4, 1, 'Others', 'youtube', { growthRate: 0.16, remote: 9, stress: 6, aiRisk: 0.32, demand: 70 }),
  c(81, 'Social Media Manager', 5, 2, 'Others', 'message', { growthRate: 0.1, remote: 9, stress: 5.5, aiRisk: 0.38, demand: 82 }),
];

export const CUSTOM_CAREER_ID_START = 10_000;
