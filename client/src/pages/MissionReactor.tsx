import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJourneyStore } from '../core/store/useJourneyStore';
import { SaponificationEngine } from '../core/domain/SaponificationEngine';

const MissionReactor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { missions, completeMission } = useJourneyStore();
  
  const missionId = parseInt(id || '0', 10);
  const mission = missions.find(m => m.id === missionId);

  // States
  const [step, setStep] = useState<1 | 2>(1); // 1 = Math/Input, 2 = Photo
  const [feedback, setFeedback] = useState<{ type: 'error'|'success'; message: string } | null>(null);
  const [evidencePhoto, setEvidencePhoto] = useState<string | null>(null);
  
  // Mission 3 (Math)
  const [oilMass, setOilMass] = useState<string>('');
  const [naohInput, setNaohInput] = useState<string>('');
  
  // Mission 5 (Temp)
  const [startTemp, setStartTemp] = useState<string>('');
  const [endTemp, setEndTemp] = useState<string>('');
  
  // Mission 8 (pH)
  const [phLevel, setPhLevel] = useState<string>('');

  // All other (Observations)
  const [observation, setObservation] = useState<string>('');

  const engine = new SaponificationEngine();

  if (!mission) return <div className="text-white p-10">Missão Não Encontrada.</div>;
  if (mission.status === 'LOCKED') return <div className="text-white p-10">⚠️ Missão Bloqueada. Complete as anteriores.</div>;

  const handleValidateForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    try {
      if (mission.id === 3) {
        // --- ESTEQUIOMETRIA ---
        const obsOil = parseFloat(oilMass);
        const obsNaoh = parseFloat(naohInput);
        if (isNaN(obsOil) || isNaN(obsNaoh) || obsOil <= 0) throw new Error("Insira números positivos válidos.");
        
        const truth = engine.calculateSaponificationValue(obsOil);
        const diff = Math.abs(obsNaoh - truth.naohGrams);

        if (diff <= 3) {
          setFeedback({ type: 'success', message: `Equação Exata! Quantidade segura: ~${truth.naohGrams}g.` });
          setStep(2);
        } else if (obsNaoh > truth.naohGrams + 3) {
          throw new Error(`🔥 Perigo Cáustico: ${obsNaoh}g criará queimaduras químicas! Refaça os cálculos. Valor ideal ~${truth.naohGrams}g.`);
        } else {
          throw new Error(`❌ Erro: ${obsNaoh}g é insuficiente. A mistura talhará por excesso de óleo.`);
        }
      } 
      else if (mission.id === 5) {
        // --- ENTALPIA ---
        const t1 = parseFloat(startTemp);
        const t2 = parseFloat(endTemp);
        if (isNaN(t1) || isNaN(t2)) throw new Error("Insira as temperaturas.");

        const isExothermic = engine.validateEnergyRelease(t1, t2);
        if (isExothermic) {
          setFeedback({ type: 'success', message: `✅ Reação Exotérmica confirmada! Delta de ${(t2 - t1).toFixed(1)}°C registrado.` });
          setStep(2);
        } else {
          throw new Error(`❄️ Falha: A temperatura não subiu. A saponificação parou ou a mistura esfriou. Delta: ${(t2 - t1).toFixed(1)}°C.`);
        }
      }
      else if (mission.id === 8) {
        // --- pH ---
        const ph = parseFloat(phLevel);
        if (isNaN(ph)) throw new Error("Insira um valor de pH válido.");

        const isSafe = engine.evaluatePHTolerance(ph);
        if (isSafe) {
          setFeedback({ type: 'success', message: `✅ pH Seguro (${ph}) aprovado para uso em pele humana.` });
          setStep(2);
        } else {
          throw new Error(`⚠️ Alerta Tóxico: pH ${ph} está fora da escala de segurança (8.0 a 10.5). Sabão INUTILIZÁVEL.`);
        }
      }
      else {
        // --- MISSÕES DE OBSERVAÇÃO/TEORIA ---
        if (observation.trim().length < 10) {
          throw new Error("Seu diário de bordo precisa ser mais descritivo. Anote suas observações com detalhes (mín. 10 caracteres).");
        }
        setFeedback({ type: 'success', message: "Observação validada no Diário!" });
        setStep(2);
      }
    } catch (err: unknown) {
      const error = err as Error;
      setFeedback({ type: 'error', message: error.message });
    }
  };

  const finalizeMission = () => {
    if (!evidencePhoto) {
      setFeedback({ type: 'error', message: 'Evidência fotográfica obrigatória não enviada!'});
      return;
    }
    // XP e Litros Salvos customizados por Missão
    const xpBase = mission.id * 100 + 400; // 500, 600...
    let savedLiters = 0;
    
    // Na missão 3 salvamos água baseada no peso do óleo
    if (mission.id === 3 && oilMass) {
      savedLiters = parseFloat(oilMass) / 1000; 
    } else if (mission.id === 1) { // Só por ver a aula ganha 0.5L simbólicos
      savedLiters = 0.5;
    }
    
    completeMission(missionId, evidencePhoto, xpBase, savedLiters);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-['Inter'] flex flex-col items-center">
      <nav className="w-full border-b border-white/10 bg-gray-900/50 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 font-bold px-3 py-1.5 rounded bg-white/5 transition">
            <span>←</span> Voltar
          </Link>
          <div className="text-sm font-bold text-[#3B82F6] ml-auto uppercase">Terminal {mission.id}</div>
        </div>
      </nav>

      <main className="w-full max-w-2xl px-6 py-12 flex-1 flex flex-col">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black font-['Outfit'] mb-4">
            {mission.id}. {mission.title}
          </h1>
          <p className="text-gray-400">
            {mission.status === 'COMPLETED' ? 'Registro arquivado.' : 'Complete os campos científicos abaixo para destravar a missão.'}
          </p>
        </div>

        {mission.status === 'COMPLETED' ? (
           <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-[#10B981] mb-6">Trilha Finalizada</h3>
              {mission.evidenceUrl && (
                <img src={mission.evidenceUrl} alt="📸" className="w-full max-w-[300px] h-48 object-cover rounded-xl border border-white/20 mx-auto" />
              )}
           </div>
        ) : (
          <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl">
            {step === 1 && (
              <form onSubmit={handleValidateForm} className="space-y-6">
                {/* DYNAMIC FORM INJECTION BASED ON MISSION ID */}
                
                {mission.id === 3 ? (
                  <>
                    <h3 className="font-bold text-[#3B82F6] text-xl border-b border-white/10 pb-2">⚖️ Estequiometria</h3>
                    <input type="number" value={oilMass} onChange={e => setOilMass(e.target.value)} className="w-full bg-black/40 border border-[#3B82F6]/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-[#3B82F6] text-white" placeholder="Massa de Óleo (g)" required />
                    <input type="number" value={naohInput} onChange={e => setNaohInput(e.target.value)} className="w-full bg-black/40 border border-[#F59E0B]/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-[#F59E0B] text-white" placeholder="NaOH Calculado (g)" required />
                  </>
                ) : mission.id === 5 ? (
                  <>
                    <h3 className="font-bold text-[#F59E0B] text-xl border-b border-white/10 pb-2">🌡️ Termodinâmica</h3>
                    <input type="number" step="0.1" value={startTemp} onChange={e => setStartTemp(e.target.value)} className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white" placeholder="Temperatura Inicial (°C)" required />
                    <input type="number" step="0.1" value={endTemp} onChange={e => setEndTemp(e.target.value)} className="w-full bg-black/40 border border-[#F59E0B]/50 rounded-xl px-4 py-3 text-white" placeholder="Temperatura Final Máxima (°C)" required />
                  </>
                ) : mission.id === 8 ? (
                  <>
                    <h3 className="font-bold text-[#10B981] text-xl border-b border-white/10 pb-2">🔬 Auditoria de Qualidade</h3>
                    <input type="number" step="0.5" value={phLevel} onChange={e => setPhLevel(e.target.value)} className="w-full bg-black/40 border border-[#10B981]/50 rounded-xl px-4 py-3 text-white" placeholder="Nível de pH (Tira Universal)" required />
                  </>
                ) : (
                  <>
                    <h3 className="font-bold text-gray-300 text-xl border-b border-white/10 pb-2">📝 Relatório Empírico</h3>
                    <textarea value={observation} onChange={e => setObservation(e.target.value)} className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white h-32" placeholder="Descreva tudo o que observou nesta etapa..." required />
                  </>
                )}

                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-lg">Validar Dados do Computador</button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in text-center">
                <h3 className="text-xl font-bold text-[#10B981]">Upload de Evidência Visual</h3>
                <p className="text-gray-400 text-sm">Insira foto da bancada atestando seu sucesso.</p>
                <div className="border-2 border-dashed border-gray-600 rounded-2xl p-8 hover:bg-white/5 relative">
                  <input type="file" accept="image/*" onChange={(e) => {
                    if (e.target.files?.[0]) setEvidencePhoto(URL.createObjectURL(e.target.files[0]));
                  }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  {evidencePhoto ? <img src={evidencePhoto} alt="Upload" className="mx-auto rounded-lg h-32" /> : <span className="text-4xl block">📸</span>}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="px-6 py-4 bg-gray-800 rounded-xl text-white">Voltar</button>
                  <button onClick={finalizeMission} className="flex-1 bg-[#10B981] text-white font-black py-4 rounded-xl">Registrar Diário 🔒</button>
                </div>
              </div>
            )}

            {feedback && (
              <div className={`mt-6 p-4 rounded-xl border ${feedback.type === 'error' ? 'bg-red-900/30 border-red-500/50 text-red-200' : 'bg-green-900/30 border-green-500/50 text-green-200'}`}>
                {feedback.message}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MissionReactor;
