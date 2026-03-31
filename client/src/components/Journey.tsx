import React from 'react';

interface Mission {
  id: number;
  title: string;
  theme: string;
  status: 'locked' | 'active' | 'completed';
}

const Journey: React.FC = () => {
  const missions: Mission[] = [
    { id: 1, title: 'O Inimigo Invisível', theme: 'Sustentabilidade', status: 'completed' },
    { id: 2, title: 'Vestindo o Jaleco', theme: 'Segurança', status: 'completed' },
    { id: 3, title: 'A Receita (Cálculos)', theme: 'Estequiometria', status: 'active' },
    { id: 4, title: 'Purificação do Óleo', theme: 'Separação', status: 'locked' },
    { id: 5, title: 'O Despertar (Reactivo)', theme: 'Entalpia', status: 'locked' },
    { id: 6, title: 'A Fusão (Trace)', theme: 'Saponificação', status: 'locked' },
    { id: 7, title: 'Molde e Repouso', theme: 'Cristalização', status: 'locked' },
    { id: 8, title: 'Auditoria de pH', theme: 'Qualidade Base', status: 'locked' },
    { id: 9, title: 'Embaixadores da Água', theme: 'Culminância', status: 'locked' },
  ];

  return (
    <section className="py-24 bg-[#0a0f1a]" id="journey">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Outfit'] text-white">
            A Jornada <span className="gradient-text-primary">Gamificada</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            9 missões estritamente encadeadas garantem que nenhuma etapa de segurança 
            seja pulada. A classe só avança quando entrega evidências científicas.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto pl-8 sm:pl-0">
          <div className="hidden sm:block absolute top-0 left-8 md:left-[45px] bottom-0 w-0.5 bg-white/10"></div>
          
          <div className="space-y-8">
            {missions.map((mission) => (
              <div key={mission.id} className="relative flex items-start gap-6 group">
                {/* Marker */}
                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 shrink-0 ${
                  mission.status === 'completed' 
                    ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]' 
                    : mission.status === 'active'
                    ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'bg-gray-800 border-gray-600 text-gray-500'
                }`}>
                  {mission.status === 'completed' ? '✓' : mission.id}
                </div>

                {/* Content Card */}
                <div className={`flex-1 p-6 rounded-2xl border-l-4 bg-gray-900/40 backdrop-blur-md border border-white/5 transition-all ${
                  mission.status === 'completed'
                    ? 'border-l-[#10B981]'
                    : mission.status === 'active'
                    ? 'border-l-[#F59E0B] bg-[#F59E0B]/5'
                    : 'border-l-transparent opacity-60'
                }`}>
                  <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${mission.status === 'locked' ? 'text-gray-500' : 'text-[#3B82F6]'}`}>
                    {mission.theme}
                  </span>
                  <h4 className="text-xl font-bold text-white m-0">Missão {mission.id}: {mission.title}</h4>
                  
                  {mission.status === 'active' && (
                    <button className="mt-4 bg-[#3B82F6] hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer">
                      Continuar Missão
                    </button>
                  )}
                  {mission.status === 'locked' && (
                    <div className="mt-4 inline-block bg-white/5 px-3 py-1 rounded-md text-sm text-gray-500">
                      Bloqueado 🔒
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
