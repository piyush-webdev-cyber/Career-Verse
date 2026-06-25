import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import QuestionnairePage from './pages/QuestionnairePage';
import SimulatorPage from './pages/SimulatorPage';
import ParallelUniversePage from './pages/ParallelUniversePage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/parallel" element={<ParallelUniversePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
}
