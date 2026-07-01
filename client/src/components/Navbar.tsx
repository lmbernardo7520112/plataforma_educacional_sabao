import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f1a]/80 backdrop-blur-md border-b border-white/10 shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 font-['Outfit'] font-extrabold text-2xl tracking-tight text-white cursor-pointer">
          <span className="text-[#10B981]">Eco</span>
          <span>Sabon</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/#about" className="text-gray-300 hover:text-[#10B981] text-sm font-medium transition-colors">O Desafio</a>
          <a href="/#journey" className="text-gray-300 hover:text-[#10B981] text-sm font-medium transition-colors">A Jornada</a>
          <a href="/#versions" className="text-gray-300 hover:text-[#10B981] text-sm font-medium transition-colors">IoT vs Manual</a>
          <Link to="/cartilha" className="text-[#F59E0B] hover:text-white text-sm font-bold transition-colors">Regras / Cartilha</Link>
          <Link to="/curso" className="text-[#3B82F6] hover:text-white text-sm font-bold transition-colors">Curso Interativo</Link>
        </div>
        
        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/professor" className="text-white hover:text-[#F59E0B] font-semibold text-sm transition-colors cursor-pointer">
            Área do Professor
          </Link>
          <Link to="/dashboard" className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] hover:opacity-90 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-opacity shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer inline-block">
            Área do Aluno
          </Link>
        </div>

        {/* Mobile: Hamburger + Aluno Button */}
        <div className="flex md:hidden items-center gap-3">
          <Link to="/dashboard" className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] hover:opacity-90 text-white px-4 py-2 rounded-full font-bold text-xs transition-opacity shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer inline-block">
            Aluno
          </Link>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-11 h-11 flex items-center justify-center text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0f1a]/95 backdrop-blur-md border-t border-white/10 animate-fadeIn">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
            <a href="/#about" className="text-gray-300 hover:text-[#10B981] text-sm font-medium transition-colors py-2">O Desafio</a>
            <a href="/#journey" className="text-gray-300 hover:text-[#10B981] text-sm font-medium transition-colors py-2">A Jornada</a>
            <a href="/#versions" className="text-gray-300 hover:text-[#10B981] text-sm font-medium transition-colors py-2">IoT vs Manual</a>
            <Link to="/cartilha" className="text-[#F59E0B] hover:text-white text-sm font-bold transition-colors py-2">Regras / Cartilha</Link>
            <Link to="/curso" className="text-[#3B82F6] hover:text-white text-sm font-bold transition-colors py-2">Curso Interativo</Link>
            <hr className="border-white/10 my-1" />
            <Link to="/professor" id="mobile-teacher-link" className="text-[#F59E0B] hover:text-white font-bold text-sm transition-colors py-2 flex items-center gap-2">
              🎓 Área do Professor
            </Link>
            <Link to="/dashboard" id="mobile-student-link" className="text-[#10B981] hover:text-white font-bold text-sm transition-colors py-2 flex items-center gap-2">
              🧪 Área do Aluno
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
