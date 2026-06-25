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

const PRODUCTION_API = 'https://career-verse-smra.onrender.com';

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
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
    return Promise.reject(error);
  }
);

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

export const runSimulation = async (
  careerId: number,
  userId: number = 1
): Promise<SimulateResponse> => {
  const { data } = await api.post('/simulate', {
    career_id: careerId,
    user_id: userId,
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

export const getDashboard = async (
  userId: number
): Promise<DashboardResponse> => {
  const { data } = await api.get(`/dashboard/${userId}`);
  return data;
};

export const getStability = async (
  careerId: number
): Promise<StabilityResponse> => {
  const { data } = await api.get(`/career/${careerId}/stability`);
  return data;
};

export default api;
