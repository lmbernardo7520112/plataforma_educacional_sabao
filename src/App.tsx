import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Dashboard from './pages/Dashboard';
import MissionReactor from './pages/MissionReactor';
import Cartilha from './pages/Cartilha';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cartilha" element={<Cartilha />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/mission/:id" element={<MissionReactor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
