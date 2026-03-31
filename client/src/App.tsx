import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import Dashboard from './pages/Dashboard';
import MissionReactor from './pages/MissionReactor';
import Cartilha from './pages/Cartilha';
import Onboarding from './pages/Onboarding';
import { useJourneyStore } from './core/store/useJourneyStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const squadId = useJourneyStore((state) => state.squadId);
  if (!squadId) {
    return <Navigate to="/onboarding" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cartilha" element={<Cartilha />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/mission/:id" element={<ProtectedRoute><MissionReactor /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
