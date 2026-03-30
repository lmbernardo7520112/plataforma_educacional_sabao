import React from 'react';

const Stack: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0f1a] overflow-hidden" id="stack">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Outfit'] text-white">
            Engenharia de <span className="gradient-text-primary">Ponta</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Desenvolvido sob padrões restritos de Specification Driven Development (SDD) e Clean Architecture, o EcoSabon é robusto, ágil e escalável.
          </p>
        </div>

        <div className="relative w-full max-w-[600px] h-[400px] mx-auto flex items-center justify-center my-16 hidden md:flex">
          {/* Central Node */}
          <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#10B981] to-[#3B82F6] flex items-center justify-center font-extrabold text-white text-lg shadow-[0_0_30px_rgba(16,185,129,0.4)] z-10 text-center leading-tight">
            SDD<br/>Core
          </div>
          
          {/* Orbit rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full border border-dashed border-white/20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dashed border-white/15"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-dashed border-white/10"></div>
          
          {/* Nodes (Static visual representation for Tailwind without complex rotation keyframes) */}
          <div className="absolute top-[8%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold text-white">React 19</div>
          <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 translate-y-1/2 bg-gray-900 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold text-white">Tailwind v4</div>
          
          <div className="absolute top-[25%] left-[16%] -translate-x-1/2 -translate-y-1/2 bg-gray-900 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold text-white">Node.js</div>
          <div className="absolute top-[50%] right-[10%] translate-x-1/2 -translate-y-1/2 bg-gray-900 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold text-white">TypeScript</div>
          <div className="absolute bottom-[25%] left-[16%] -translate-x-1/2 translate-y-1/2 bg-gray-900 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold text-white">MongoDB</div>

          <div className="absolute top-[50%] left-[4%] -translate-x-1/2 -translate-y-1/2 bg-gray-900 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold text-white">Docker</div>
          <div className="absolute top-[15%] right-[2%] translate-x-1/2 -translate-y-1/2 bg-gray-900 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold text-white">Zustand</div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {['Modularidade Extrema (Clean Architecture)', 'Rest & WebSockets integrados', 'Design System em Tailwind', 'Vitest 100% Coverage', 'Conteinerização Docker'].map(feature => (
            <div key={feature} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 font-medium">
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stack;
