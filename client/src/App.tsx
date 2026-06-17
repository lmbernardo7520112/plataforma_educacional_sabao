import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LandingPage from './LandingPage';
import Dashboard from './pages/Dashboard';
import MissionReactor from './pages/MissionReactor';
import Cartilha from './pages/Cartilha';
import Onboarding from './pages/Onboarding';
import TeacherArea from './pages/TeacherArea';
import GroupReport from './pages/GroupReport';
import { useJourneyStore } from './core/store/useJourneyStore';

// Lazy-loaded: Curso Interativo (Nível 4 — embedded in React)
const CourseViewer = lazy(() => import('./pages/CourseViewer'));

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
        <Route path="/professor" element={<TeacherArea />} />
        <Route path="/report/:squadId" element={<GroupReport />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/mission/:id" element={<ProtectedRoute><MissionReactor /></ProtectedRoute>} />
        <Route path="/curso" element={<Suspense fallback={<div style={{minHeight:'100vh',background:'#0a0f1a',display:'flex',alignItems:'center',justifyContent:'center',color:'#9CA3AF'}}>Carregando curso...</div>}><CourseViewer /></Suspense>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
