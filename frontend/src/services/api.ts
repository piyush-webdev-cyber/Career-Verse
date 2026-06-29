import axios from 'axios';
import type {
  Career,
  QuestionnaireData,
  RecommendResponse,
  SimulateResponse,
  CompareResponse,
  AIDisruptionResponse,
  DashboardResponse,
  StabilityResponse,
} from '../types';
import type { AuthResponse, AuthUser, LoginData, SignupData } from '../types/auth';

const PRODUCTION_API = 'https://career-verse-smra.onrender.com';
const TOKEN_KEY = 'careerverse_token';

function resolveApiBase(): string {
  const fromEnv = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (import.meta.env.DEV) return '/api';
  return PRODUCTION_API;
}

export const API_BASE = resolveApiBase();

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 120_000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url ?? '';
      const isAuthRoute = url.includes('/auth/login') || url.includes('/auth/signup');
      if (!isAuthRoute) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem('careerverse_user');
        if (
          !window.location.pathname.startsWith('/login') &&
          !window.location.pathname.startsWith('/signup')
        ) {
          window.location.href = `/login?from=${encodeURIComponent(window.location.pathname)}`;
        }
      }
    }
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(
        new Error(
          'Request timed out. The server may be waking up — wait a moment and try again.'
        )
      );
    }
    if (!error.response) {
      return Promise.reject(
        new Error(
          'Cannot reach the API. If this is your first visit, the backend may need ~30s to start on Render.'
        )
      );
    }
    const detail = error.response?.data?.detail;
    return Promise.reject(
      new Error(typeof detail === 'string' ? detail : 'Request failed')
    );
  }
);

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const { data: res } = await api.post('/auth/signup', data);
  return res;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const { data: res } = await api.post('/auth/login', data);
  return res;
};

export const getMe = async (): Promise<AuthUser> => {
  const { data } = await api.get('/auth/me');
  return data;
};

export const getCareers = async (): Promise<Career[]> => {
  const { data } = await api.get('/careers');
  return data.careers;
};

export const getCareer = async (id: number): Promise<Career> => {
  const { data } = await api.get(`/career/${id}`);
  return data;
};

export const recommendCareers = async (
  questionnaire: QuestionnaireData
): Promise<RecommendResponse> => {
  const { data } = await api.post('/recommend', questionnaire);
  return data;
};

export const runSimulation = async (careerId: number): Promise<SimulateResponse> => {
  const { data } = await api.post('/simulate', {
    career_id: careerId,
    num_simulations: 10000,
  });
  return data;
};

export const compareCareers = async (
  careerIds: number[]
): Promise<CompareResponse> => {
  const { data } = await api.post('/compare', { career_ids: careerIds });
  return data;
};

export const getAIDisruption = async (
  careerName: string
): Promise<AIDisruptionResponse> => {
  const { data } = await api.get(
    `/ai-disruption/${encodeURIComponent(careerName)}`
  );
  return data;
};

export const getDashboard = async (): Promise<DashboardResponse> => {
  const { data } = await api.get('/dashboard/me');
  return data;
};

export const getStability = async (
  careerId: number
): Promise<StabilityResponse> => {
  const { data } = await api.get(`/career/${careerId}/stability`);
  return data;
};

export default api;
