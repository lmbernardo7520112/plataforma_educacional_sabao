import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-[#111827] relative" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Outfit'] text-white">
            O Problema e a <span className="gradient-text-primary">Solução</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Entenda por que reciclar o óleo de cozinha nas escolas é urgente e como 
            nossa plataforma torna isso possível através do ensino gamificado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-10 bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-2xl hover:-translate-y-2 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300">
            <div className="text-4xl mb-6">⚠️</div>
            <h3 className="text-2xl font-bold mb-4 text-white">O Desastre Silencioso</h3>
            <p className="text-gray-400 leading-relaxed">
              Apenas 1 litro de óleo de cozinha usado descartado incorretamente no ralo 
              pode contaminar até 25.000 litros de água potável, prejudicando rios, solos 
              e a infraestrutura da cidade.
            </p>
          </div>
          
          <div className="p-10 bg-gradient-to-b from-[#10B981]/5 to-gray-900/80 backdrop-blur-xl border border-[#10B981]/40 rounded-2xl hover:-translate-y-2 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#10B981] to-[#3B82F6]"></div>
            <div className="text-4xl mb-6">🌱</div>
            <h3 className="text-2xl font-bold mb-4 text-[#10B981]">A Solução EcoSabon</h3>
            <p className="text-gray-400 leading-relaxed">
              Transformamos escolas em autênticas usinas de reciclagem educacionais. Os alunos coletam o óleo e o convertem em 
              sabão neutro, guiados por trilhas passo a passo.
            </p>
          </div>
          
          <div className="p-10 bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-2xl hover:-translate-y-2 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300">
            <div className="text-4xl mb-6">🧪</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Rigor Científico</h3>
            <p className="text-gray-400 leading-relaxed">
              Não é "apenas uma receita". O sistema cobra cálculos de índice de saponificação, 
              medições de entalpia, e auditoria de pH para garantir segurança máxima.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 bg-gray-900/50 rounded-3xl border border-white/5 overflow-hidden">
          <div className="flex-1 p-8 lg:p-12">
            <h3 className="text-3xl font-bold mb-4 text-[#3B82F6]">Uma Extensão do Laboratório</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Em escolas públicas onde faltam laboratórios físicos equipados, a plataforma 
              atua como substituto metodológico, ensinando o método científico "Hipótese-Teste-Registro", 
              através de uploads fáceis de fotos, diários de bordo e alertas de segurança.
            </p>
          </div>
          <div className="flex-[1.2] w-full h-full">
             <img src="/assets/lab-illustration.png" alt="Workspace digital de química" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
