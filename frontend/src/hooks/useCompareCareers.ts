import { useCallback, useEffect, useState } from 'react';
import {
  BUILTIN_CAREERS,
  CUSTOM_CAREER_ID_START,
  type CompareCareerOption,
  type CareerCategory,
} from '../data/careers';

const STORAGE_KEY = 'careerverse_custom_careers';

function loadCustom(): CompareCareerOption[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CompareCareerOption[];
    return Array.isArray(parsed) ? parsed.map((c) => ({ ...c, isCustom: true })) : [];
  } catch {
    return [];
  }
}

function saveCustom(careers: CompareCareerOption[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(careers));
}

export interface AddCustomCareerInput {
  name: string;
  averageSalary: number;
  educationYears: number;
  category: CareerCategory;
  notes?: string;
}

export function useCompareCareers() {
  const [customCareers, setCustomCareers] = useState<CompareCareerOption[]>([]);

  useEffect(() => {
    setCustomCareers(loadCustom());
  }, []);

  const allCareers = [...BUILTIN_CAREERS, ...customCareers];

  const addCustomCareer = useCallback((input: AddCustomCareerInput) => {
    setCustomCareers((prev) => {
      const nextId =
        Math.max(
          CUSTOM_CAREER_ID_START - 1,
          ...prev.map((c) => c.id),
          CUSTOM_CAREER_ID_START - 1
        ) + 1;

      const career: CompareCareerOption = {
        id: nextId,
        name: input.name.trim(),
        averageSalary: input.averageSalary,
        educationYears: input.educationYears,
        category: input.category,
        icon: 'briefcase',
        notes: input.notes?.trim() || undefined,
        isCustom: true,
        growthRate: 0.1,
        stress: 6,
        flexibility: 6,
        remote: 5,
        aiRisk: 0.3,
        demand: 70,
      };
      const next = [...prev, career];
      saveCustom(next);
      return next;
    });
  }, []);

  return { allCareers, customCareers, addCustomCareer };
}
