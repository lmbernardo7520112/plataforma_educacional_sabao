import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJourneyStore } from '../core/store/useJourneyStore';
import { SaponificationEngine } from '../core/domain/SaponificationEngine';

const MissionReactor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { missions, currentActiveMissionId, completeMission } = useJourneyStore();
  
  const missionId = parseInt(id || '0', 10);
  const mission = missions.find(m => m.id === missionId);

  // Formulário State (Simulando Diário de Bordo manual)
  const [oilMass, setOilMass] = useState<string>('');
  const [naohInput, setNaohInput] = useState<string>('');
  const [feedback, setFeedback] = useState<{ type: 'error'|'success'|'info'; message: string } | null>(null);
  const [evidencePhoto, setEvidencePhoto] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1); // 1 = Math/Chemistry, 2 = Photo Evidence

  const engine = new SaponificationEngine();

  // Proteções de Rota Gamificada
  if (!mission) return <div className="text-white p-10">Missão Não Encontrada.</div>;
  if (mission.status === 'LOCKED') return <div className="text-white p-10">⚠️ Esta missão ainda está bloqueada na sua trilha.</div>;

  const handleValidateMath = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    
    const obsOil = parseFloat(oilMass);
    const obsNaoh = parseFloat(naohInput);

    if (isNaN(obsOil) || isNaN(obsNaoh) || obsOil <= 0) {
      setFeedback({ type: 'error', message: 'Entrada inválida. Limpe os béqueres e insira números positivos.' });
      return;
    }

    try {
      // Motor faz a química de verdade:
      const truth = engine.calculateSaponificationValue(obsOil);

      // Verificação Educacional (Margem de erro de +/- 3g na Matemática Escolar)
      const difference = Math.abs(obsNaoh - truth.naohGrams);

      if (difference <= 3) {
         setFeedback({ type: 'success', message: `Equação balanceada perfeitamente! Quantidade Segura (incluindo margem *superfatting*): ~${truth.naohGrams}g. Pode Prosseguir para o reator físico.` });
         setStep(2); // Avança para a foto
      } else if (obsNaoh > truth.naohGrams + 3) {
         setFeedback({ type: 'error', message: `🔥 Cuidado! ${obsNaoh}g de NaOH criará um Sabão CÁUSTICO! Você queimará a pele do usuário. Calcule o Índice de Saponificação novamente. Valor esperado rondando ~${truth.naohGrams}g.` });
      } else {
         setFeedback({ type: 'error', message: `❌ Erro: ${obsNaoh}g de NaOH é insuficiente. Teremos excesso de óleo e falta de espuma. Reavalie sua regra de três!` });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  const handleSimulatePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mock upload real renderizando um base64 local URL
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setEvidencePhoto(imageUrl);
    }
  };

  const finalizeMission = () => {
    if (!evidencePhoto) {
      setFeedback({ type: 'error', message: 'Você não pode pular a evidência fotográfica. Metodologia científica exige registro visual!'});
      return;
    }

    // Ganhar 500 XP por concluir, e salva proporção de água limpa equivalente à massa de óleo em Litros.
    completeMission(missionId, evidencePhoto, 500, parseFloat(oilMass) / 1000);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-['Inter'] flex flex-col items-center">
      {/* Navbar simplificada */}
      <nav className="w-full border-b border-white/10 bg-gray-900/50 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 font-bold px-3 py-1.5 rounded bg-white/5 transition">
            <span>←</span> Abortar Estação
          </Link>
          <div className="text-sm font-semibold tracking-wide text-[#3B82F6] ml-auto uppercase">Bancada Escolar #3</div>
        </div>
      </nav>

      <main className="w-full max-w-2xl px-6 py-12 flex-1 flex flex-col">
        <div className="mb-10 text-center">
          <span className="text-[#F59E0B] font-bold tracking-widest text-xs uppercase mb-2 block">{mission.theme}</span>
          <h1 className="text-3xl md:text-4xl font-black font-['Outfit'] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Missão {mission.id}: {mission.title}
          </h1>
          <p className="text-gray-400">
            {mission.status === 'COMPLETED' 
              ? 'Você já validou e documentou esta etapa no seu diário de bordo.' 
              : 'Execute os passos da cartilha. Se houver erro de segurança o motor EcoSabon acionará o bloqueio.'}
          </p>
        </div>

        {mission.status === 'COMPLETED' ? (
           <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-[#10B981] mb-6">Diário de Bordo Fechado</h3>
              {mission.evidenceUrl && (
                <img src={mission.evidenceUrl} alt="Sua Evidência" className="w-full max-w-[300px] h-48 object-cover rounded-xl border border-white/20 mx-auto shadow-xl" />
              )}
           </div>
        ) : (
          <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
            
            {/* ETAPA 1: MOTOR MATEMÁTICO */}
            {step === 1 && (
              <form onSubmit={handleValidateMath} className="space-y-6">
                <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center font-bold">1</div>
                  <h3 className="text-xl font-bold text-white">Laboratório: Equação Química</h3>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Massa Reciclada de Óleo Usado (em gramas):</label>
                  <input type="number" 
                    value={oilMass} 
                    onChange={e => setOilMass(e.target.value)}
                    className="w-full bg-black/40 border border-[#3B82F6]/30 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] font-mono text-lg"
                    placeholder="Ex: 1000"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">Dica: Use a balança de precisão da sua bancada.</p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">NaOH Calculado na Caderneta (Regra de 3):</label>
                  <input type="number" 
                    value={naohInput} 
                    onChange={e => setNaohInput(e.target.value)}
                    className="w-full bg-black/40 border border-[#F59E0B]/30 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] font-mono text-lg"
                    placeholder="Sua resposta em gramas (Ex: 129)"
                    required
                  />
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-gradient-to-r from-[#10B981] to-[#3B82F6] hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
                    Validar Estequiometria
                  </button>
                </div>
              </form>
            )}

            {/* ETAPA 2: UPLOAD DA EVIDÊNCIA (SIMULAÇÃO FÍSICA) */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center font-bold text-white">2</div>
                  <h3 className="text-xl font-bold text-[#10B981]">Auditoria: Anexar Diário</h3>
                </div>

                <p className="text-gray-300">A matemática está exata. Agora você tem permissão do sistema para manusear a soda real. Ao finalizar a mistura, fotografe o resultado (ou cor do béquer) para auditoria do professor.</p>
                
                <div className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:bg-white/5 transition-colors group cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleSimulatePhotoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  
                  {evidencePhoto ? (
                    <img src={evidencePhoto} alt="Upload Mock" className="w-full h-48 object-contain rounded-lg" />
                  ) : (
                    <div className="py-6">
                      <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">📸</span>
                      <span className="text-gray-400 font-semibold text-sm">Clique ou Arraste uma Foto do Laboratório</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex gap-4">
                  <button onClick={() => setStep(1)} className="px-6 py-4 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition">
                    Voltar Rascunho
                  </button>
                  <button onClick={finalizeMission} className="flex-1 bg-[#10B981] text-white font-black py-4 rounded-xl hover:bg-green-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition">
                    Fechar Diário e Desbloquear Próxima Fase
                  </button>
                </div>
              </div>
            )}

            {/* CAIXA DE ALERTA DINÂMICA (Baseada no Motor Core) */}
            {feedback && (
              <div className={`mt-8 p-4 rounded-xl border flex items-start gap-4 ${
                feedback.type === 'error' ? 'bg-red-900/20 border-red-500/50 text-red-200' :
                feedback.type === 'success' ? 'bg-green-900/20 border-green-500/50 text-green-200' :
                'bg-blue-900/20 border-blue-500/50 text-blue-200'
              }`}>
                <span className="text-2xl mt-1">
                  {feedback.type === 'error' ? '☢️' : '🧠'}
                </span>
                <p className="font-semibold leading-relaxed">
                  {feedback.message}
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MissionReactor;
