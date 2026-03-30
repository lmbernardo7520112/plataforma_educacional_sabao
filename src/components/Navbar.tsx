import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f1a]/80 backdrop-blur-md border-b border-white/10 shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-2 font-['Outfit'] font-extrabold text-2xl tracking-tight text-white cursor-pointer">
          <span className="text-[#10B981]">Eco</span>
          <span>Sabon</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-gray-300 hover:text-[#10B981] text-sm font-medium transition-colors">O Desafio</a>
          <a href="#journey" className="text-gray-300 hover:text-[#10B981] text-sm font-medium transition-colors">A Jornada</a>
          <a href="#versions" className="text-gray-300 hover:text-[#10B981] text-sm font-medium transition-colors">IoT vs Manual</a>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="hidden md:block text-white hover:text-[#3B82F6] font-semibold text-sm transition-colors cursor-pointer">
            Portal da Escola
          </button>
          <button className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] hover:opacity-90 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-opacity shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer">
            Área do Aluno
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
