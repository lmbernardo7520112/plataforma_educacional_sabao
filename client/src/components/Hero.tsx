import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="relative w-full min-h-screen pt-24 overflow-hidden bg-gradient-to-b from-[#0a0f1a] via-[#111827] to-[#0a0f1a] flex items-center justify-center">
      
      {/* Decorative gradient orbs for modern dark science feel */}
      <div className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] bg-[#10B981] rounded-full mix-blend-screen filter blur-[100px] opacity-10 blur-3xl rounded-full animate-pulse z-0"></div>
      <div className="absolute top-[30%] right-[10%] w-[25vw] h-[25vw] min-w-[250px] min-h-[250px] bg-[#3B82F6] rounded-full mix-blend-screen filter blur-[100px] opacity-10 blur-3xl animate-[pulse_4s_infinite] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[#F59E0B] font-bold text-xs uppercase tracking-widest mb-6">
            Lançamento Escolar 2026
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-white">
            Ciência que <br/>
            <span className="gradient-text-primary">Transforma.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed">
            Plataforma educacional imersiva de Química Verde e Física Gamificada. 
            Converta óleo de cozinha usado em sabão neutro com rigor matemático, 
            IoT e aprendizagem baseada em missões.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] hover:opacity-90 text-white px-8 py-3.5 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_4px_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer">
              <span>Iniciar Experimento</span>
              <span>🧪</span>
            </button>
            <button className="px-8 py-3.5 rounded-full font-bold text-lg text-white border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#10B981] flex items-center justify-center gap-2 cursor-pointer">
              <span>Baixar Diário PDF</span>
              <span>📝</span>
            </button>
          </div>
        </div>

        {/* Visual Content */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative z-10 bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-transform duration-500 max-w-md md:max-w-lg w-full">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#3B82F6] rounded-full blur-xl opacity-50"></div>
            <img src="/assets/hero-illustration.png" alt="Animação de Reator Gamificado" className="w-full h-auto rounded-2xl border border-white/5" />
            
            <div className="absolute -bottom-6 -left-6 bg-gray-900/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xl font-bold border border-green-500/30">
                 ✓
               </div>
               <div>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Estequiometria</p>
                 <p className="text-sm text-white font-medium">Reação 100% Segura</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
