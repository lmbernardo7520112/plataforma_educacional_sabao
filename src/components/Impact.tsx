import React from 'react';

const Impact: React.FC = () => {
  return (
    <section className="relative py-32 bg-[#111827] overflow-hidden" id="impact">
      <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/20 to-[#3B82F6]/20 z-0"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
          A Matemática da Sustentabilidade
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-16 opacity-90 leading-relaxed">
          Cada grama de óleo jogada no ralo tem um preço socioambiental. O EcoSabon ensina os alunos a reverterem essa dívida em tempo real.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 p-8 md:p-12 bg-gray-900/70 backdrop-blur-xl border border-[#10B981]/30 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center gap-4">
            <span className="text-6xl md:text-7xl">🛢️</span>
            <h4 className="text-2xl md:text-3xl font-bold text-white">1 Litro de Óleo Usado</h4>
          </div>
          
          <div className="text-5xl md:text-7xl font-black text-gray-600">=</div>
          
          <div className="flex flex-col items-center gap-4">
            <span className="text-6xl md:text-7xl">💧</span>
            <h4 className="text-2xl md:text-3xl font-extrabold text-[#10B981]">25.000L de Água Salva</h4>
          </div>
        </div>

        <button className="mt-16 bg-white text-[#0a0f1a] hover:bg-gray-100 px-10 py-5 rounded-full font-black text-xl transition-all shadow-xl hover:scale-105 hover:shadow-2xl cursor-pointer">
          Junte-se à Inciativa EcoSabon
        </button>
      </div>
    </section>
  );
};

export default Impact;
