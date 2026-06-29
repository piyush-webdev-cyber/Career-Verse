import { createContext, useContext, useState, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import type { CareerMatch, SimulateResponse } from '../types';

interface AppState {
  userId: number;
  matches: CareerMatch[];
  setMatches: (matches: CareerMatch[]) => void;
  lastSimulation: SimulateResponse | null;
  setLastSimulation: (sim: SimulateResponse | null) => void;
  selectedCareerId: number | null;
  setSelectedCareerId: (id: number | null) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [matches, setMatches] = useState<CareerMatch[]>([]);
  const [lastSimulation, setLastSimulation] = useState<SimulateResponse | null>(null);
  const [selectedCareerId, setSelectedCareerId] = useState<number | null>(null);

  const userId = user?.id ?? 0;

  return (
    <AppContext.Provider
      value={{
        userId,
        matches,
        setMatches,
        lastSimulation,
        setLastSimulation,
        selectedCareerId,
        setSelectedCareerId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function useAppSafe() {
  return useContext(AppContext);
}
