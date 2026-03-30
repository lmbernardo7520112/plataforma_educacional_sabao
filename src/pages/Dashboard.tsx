import React from 'react';
import { Link } from 'react-router-dom';
import { useJourneyStore } from '../core/store/useJourneyStore';

const Dashboard: React.FC = () => {
  const { missions, currentActiveMissionId, totalXP, waterSavedLiters } = useJourneyStore();

  const activeMission = missions.find(m => m.id === currentActiveMissionId);

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-['Inter']">
      {/* Top Navigation */}
      <nav className="border-b border-white/10 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 font-['Outfit'] font-extrabold text-2xl tracking-tight cursor-pointer">
            <span className="text-[#10B981]">Eco</span>
            <span>Sabon</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Status: Laboratório</p>
              <p className="text-sm font-semibold text-[#3B82F6]">Turma 3º Ano A</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-[#3B82F6] flex items-center justify-center font-bold shadow-lg">
              AL
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Gamification Hub */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#F59E0B]/50 transition-colors">
            <span className="text-gray-400 text-sm font-semibold mb-2">XP Acumulado</span>
            <div className="text-4xl font-black text-[#F59E0B] tracking-tight">{totalXP} <span className="text-xl">xp</span></div>
          </div>
          <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#10B981]/50 transition-colors lg:col-span-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <span className="text-gray-400 text-sm font-semibold mb-2 flex items-center gap-2">
              💧 Fator de Impacto Ambiental
            </span>
            <div className="text-4xl sm:text-5xl font-black text-[#10B981] tracking-tight">
              {waterSavedLiters.toLocaleString('pt-BR')} <span className="text-xl text-white">Litros de água salvos</span>
            </div>
          </div>
          <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#3B82F6]/50 transition-colors">
            <span className="text-gray-400 text-sm font-semibold mb-2">Progresso</span>
            <div className="text-4xl font-black text-[#3B82F6] tracking-tight">
              {currentActiveMissionId - 1} <span className="text-xl text-gray-500">/ 9</span>
            </div>
          </div>
        </section>

        {/* Active Mission Banner */}
        {activeMission && (
          <section className="mb-16">
            <h2 className="font-['Outfit'] text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">Missão Ativa</h2>
            <div className="relative bg-gradient-to-r from-[#3B82F6]/20 to-[#10B981]/10 border border-[#3B82F6]/40 rounded-3xl p-8 lg:p-12 overflow-hidden hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-shadow">
              <div className="absolute top-0 right-0 p-8 opacity-20 text-8xl">🔬</div>
              <div className="relative z-10 max-w-3xl">
                <span className="inline-block px-4 py-1.5 rounded-full border border-[#3B82F6]/50 bg-[#3B82F6]/20 text-[#3B82F6] font-bold text-xs uppercase tracking-widest mb-6">
                  Fase {activeMission.id}: {activeMission.theme}
                </span>
                <h3 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
                  {activeMission.title}
                </h3>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
                  Prepare seu diário de bordo. Você precisa concluir esta etapa com rigor científico 
                  para destravar os equipamentos da próxima missão laboratorial. Segurança em primeiro lugar.
                </p>
                <button className="bg-[#3B82F6] hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/30 cursor-pointer">
                  Iniciar Experimento
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Missões Antigas e Futuras */}
        <section>
          <h2 className="font-['Outfit'] text-xl font-bold mb-6 text-gray-400">Trilha de Sabedoria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {missions.map((mission) => (
              <div 
                key={mission.id} 
                className={`p-5 rounded-2xl border transition-all ${
                  mission.status === 'COMPLETED' 
                    ? 'border-[#10B981]/30 bg-[#10B981]/5 hover:bg-[#10B981]/10' 
                    : mission.status === 'ACTIVE'
                    ? 'border-[#F59E0B]/50 bg-[#F59E0B]/10 ring-1 ring-[#F59E0B]/50'
                    : 'border-white/5 bg-gray-900/40 opacity-50 grayscale'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    mission.status === 'COMPLETED' ? 'text-[#10B981]' 
                    : mission.status === 'ACTIVE' ? 'text-[#F59E0B]' 
                    : 'text-gray-500'
                  }`}>
                    {mission.theme}
                  </span>
                  {mission.status === 'COMPLETED' && <span className="text-[#10B981] font-bold">✓</span>}
                  {mission.status === 'LOCKED' && <span className="text-gray-500">🔒</span>}
                </div>
                <h4 className={`text-lg font-bold ${mission.status === 'LOCKED' ? 'text-gray-400' : 'text-white'}`}>
                  {mission.id}. {mission.title}
                </h4>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Dashboard;
