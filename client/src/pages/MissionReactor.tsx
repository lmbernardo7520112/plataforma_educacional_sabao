import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJourneyStore } from '../core/store/useJourneyStore';
import { SaponificationEngine } from 'shared/domain/SaponificationEngine';
import { api } from '../lib/api';
import axios from 'axios';
import { MISSION_DOCS, ScientificField } from 'shared/config/missionDocs';

const fieldLabels: Record<ScientificField, { label: string, desc: string }> = {
  hypothesis: { label: '💡 Hipótese', desc: 'O que você achava que iria acontecer com base na química teórica?' },
  procedure: { label: '🧪 Procedimento', desc: 'Descreva a sua ação e manipulação na bancada.' },
  observations: { label: '👁️ Observações', desc: 'Anote fatores qualitativos, reações, mudanças de cor e estado físico.' },
  conclusion: { label: '📌 Conclusão', desc: 'A teoria se provou na prática? Resuma o aprendizado do experimento.' }
};

const MissionReactor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { missions, squadId, completeMission } = useJourneyStore();
  
  const missionId = parseInt(id || '0', 10);
  const mission = missions.find(m => m.id === missionId);
  // Casting keyof typeof since TS generic index must match securely
  const docs = MISSION_DOCS[missionId as keyof typeof MISSION_DOCS];

  // Steps Navigator
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1 = Briefing, 2 = Metodologia/Matemática, 3 = Foto
  
  // Scientific Method State
  const [sciMethod, setSciMethod] = useState<Record<ScientificField, string>>({
    hypothesis: '',
    procedure: '',
    observations: '',
    conclusion: ''
  });

  // Numeric Engine State
  const [numericInputs, setNumericInputs] = useState<Record<string, string>>({
    oilMassGrams: '',
    naohGrams: '',
    startTemp: '',
    endTemp: '',
    phLevel: ''
  });

  const [evidencePhoto, setEvidencePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!mission || !docs) return <div className="text-white p-10 items-center justify-center flex">Missão ou Documentação Inexistente.</div>;
  if (mission.status === 'COMPLETED') return <div className="text-white p-10">⚠️ Relatório Científico Já Registrado.</div>;

  const handleSciMethodChange = (field: ScientificField, val: string) => {
    setSciMethod(prev => ({ ...prev, [field]: val }));
  };
  const handleNumericChange = (field: string, val: string) => {
    setNumericInputs(prev => ({ ...prev, [field]: val }));
  };

  const handleScientificValidation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // UX Validation: Methodological Rigor Constraints locally
      for (const field of docs.requiredScientificFields) {
        if (sciMethod[field].trim().length < 10) {
           throw new Error(`O campo "[${fieldLabels[field].label}]" exige pelo menos 10 caracteres explicativos.`);
        }
      }

      // UX Validation: Engine Feedback
      const engine = new SaponificationEngine();
      if (mission.id === 3) {
        const obsOil = parseFloat(numericInputs.oilMassGrams);
        const obsNaoh = parseFloat(numericInputs.naohGrams);
        if (isNaN(obsOil) || isNaN(obsNaoh) || obsOil <= 0) throw new Error("Insira números válidos de massa (em gramas).");
        
        const truth = engine.calculateSaponificationValue(obsOil);
        if (Math.abs(obsNaoh - truth.naohGrams) > 1) {
           throw new Error(`Falha Estequiométrica Viva! Cargas em desbalanceamento: a massa ideal era de ~${truth.naohGrams}g de Soda.`);
        }
      }
      if (mission.id === 5) {
        const t1 = parseFloat(numericInputs.startTemp);
        const t2 = parseFloat(numericInputs.endTemp);
        if (isNaN(t1) || isNaN(t2)) throw new Error("Insira as medições de temperatura do Reagente.");
        if (!engine.validateEnergyRelease(t1, t2)) throw new Error("Termodinâmica Irregular: A diluição alcalina deve elevar violentamente a temperatura. Subiu menos que 2°C.");
      }
      if (mission.id === 8) {
        const ph = parseFloat(numericInputs.phLevel);
        if (isNaN(ph)) throw new Error("Insira a faixa numérica do Teste Universal (pH).");
        if (!engine.evaluatePHTolerance(ph)) throw new Error(`Bloqueio de Qualidade: O pH final marcou [${ph}], o que significa severo risco corrosivo ou baixa estabilidade e está rejeitado pela Agência Reguladora.`);
      }

      // In pilot mode (uploads blocked), submit directly; otherwise go to photo step
      const isPilotMode = import.meta.env.VITE_PILOT_MODE === 'true' || import.meta.env.VITE_PILOT_UPLOADS_BLOCKED === 'true';
      if (isPilotMode) {
        await submitToServer(false);
      } else {
        setStep(3); // Avança pra foto
      }
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  const submitToServer = async (requirePhoto = true) => {
    if (!squadId) {
       setError('Grupo não identificado na sessão atual.');
       return;
    }

    if (squadId === 'visitor-sandbox') {
      setLoading(true);
      setError(null);
      try {
        const waterSaved = missionId === 3 ? (parseFloat(numericInputs.oilMassGrams) || 0) / 1000 : 0.5;
        // Simula o complete da missão no Zustand sem enviar dados à API
        completeMission(missionId, photoPreview || 'demo-evidence-url', 100, waterSaved);
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.message || 'Falha ao simular diário local.');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (requirePhoto && !evidencePhoto) {
      setError('Evidência fotográfica atestatória é insubstituível. Tire a foto da equipe.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // FormData empacota binários e JSON Strings via Multipart
      const formData = new FormData();
      formData.append('missionId', mission.id.toString());
      formData.append('scientificMethod', JSON.stringify(sciMethod));
      
      const parsedNumeric: Record<string, number> = {};
      Object.keys(numericInputs).forEach(k => {
        if (numericInputs[k] !== '') {
          parsedNumeric[k] = parseFloat(numericInputs[k]);
        }
      });
      formData.append('numericInputs', JSON.stringify(parsedNumeric));
      if (evidencePhoto) {
        formData.append('evidencePhoto', evidencePhoto);
      }

      const { data } = await api.post(`/squads/${squadId}/missions/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Commit global ao Store: Evidencia do server, calculo de score generico pro MVP
      const waterSaved = data.data.numericInputs?.oilMassGrams ? data.data.numericInputs.oilMassGrams / 1000 : 0.5;
      completeMission(missionId, data.data.evidenceUrl, data.data.xpEarned, waterSaved);
      
      navigate('/dashboard');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'Falha de transmissão na via do reator.');
      } else {
        setError((err as Error).message || 'Falha imprevista no simulador.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-['Inter'] flex flex-col items-center">
      <nav className="w-full border-b border-white/10 bg-gray-900/50 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Link to="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 font-bold px-3 py-1.5 rounded bg-white/5 transition">
            <span>←</span> Voltar
          </Link>
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`w-3 h-3 rounded-full ${step >= s ? 'bg-[#3B82F6]' : 'bg-gray-700'}`} />
            ))}
          </div>
          <div className="text-sm font-bold text-[#3B82F6] uppercase">Bancada Terminal {mission.id}</div>
        </div>
      </nav>

      <main className="w-full max-w-3xl px-6 py-12 flex-1 flex flex-col">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black font-['Outfit'] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            {mission.id}. {mission.title}
          </h1>
        </div>

        {error && (
            <div className="bg-red-900/40 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 text-sm text-center animate-pulse">
                {error}
            </div>
        )}

        <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl border-t-4 border-t-blue-500">
          
          {/* STEP 1: CONTEXTUALIZAÇÃO ACADÊMICA */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <span className="text-4xl">📚</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-200">Revisão Bibliográfica (Briefing)</h2>
                  <p className="text-sm text-gray-400">Leia com sua equipe antes do experimento</p>
                </div>
              </div>
              
              <div className="bg-blue-900/10 border border-blue-500/20 p-5 rounded-2xl">
                <p className="text-gray-300 leading-relaxed text-lg">{docs.context}</p>
              </div>

              <div className="bg-emerald-900/10 border border-emerald-500/20 p-5 rounded-2xl">
                <h4 className="font-bold text-emerald-400 mb-2">🎯 Alvo Operacional</h4>
                <p className="text-gray-300">{docs.objective}</p>
              </div>
              
              <div className="bg-purple-900/10 border border-purple-500/20 p-5 rounded-2xl">
                <h4 className="font-bold text-purple-400 mb-2">⚡ Ponto de Ação da Equipe</h4>
                <p className="text-gray-300">{docs.actionPrompt}</p>
              </div>

              <button onClick={() => setStep(2)} className="w-full mt-8 bg-[#3B82F6] hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition">
                Compreendemos. Ir para a Bancada →
              </button>
            </div>
          )}

          {/* STEP 2: METODOLOGIA E TESTES ESTEQUIMÉTRICOS (FORMULÁRIO) */}
          {step === 2 && (
             <form onSubmit={handleScientificValidation} className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h2 className="text-2xl font-bold text-gray-200 flex items-center gap-3">
                    <span className="text-3xl">🔬</span> Diário Biográfico de Pesquisa
                  </h2>
                </div>

                {/* FIELDS METODOLÓGICOS DINÂMICOS */}
                <div className="space-y-6">
                  {docs.requiredScientificFields.map(field => (
                    <div key={field} className="bg-black/30 p-4 rounded-2xl border border-white/5">
                       <label className="block font-bold text-blue-300 mb-1">{fieldLabels[field].label}</label>
                       <p className="text-xs text-gray-500 mb-3">{fieldLabels[field].desc}</p>
                       <textarea 
                          required
                          value={sciMethod[field]} 
                          onChange={e => handleSciMethodChange(field, e.target.value)}
                          className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white h-28 focus:outline-none focus:border-blue-500 transition" 
                          placeholder="Reúna os dados e disserte..."
                       />
                    </div>
                  ))}
                </div>

                {/* FILTROS MATEMÁTICOS (ESTEQUIOMETRIA / TERMODINÂMICA) */}
                {mission.id === 3 && (
                  <div className="grid grid-cols-2 gap-4 bg-orange-900/10 p-4 border border-orange-500/30 rounded-2xl">
                    <div className="col-span-2"><h3 className="font-bold text-orange-400">⚖️ Estequiometria Limpa</h3></div>
                    <input type="number" step="0.1" value={numericInputs.oilMassGrams} onChange={e => handleNumericChange('oilMassGrams', e.target.value)} className="bg-gray-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-orange-500 text-white" placeholder="Óleo filtrado (g)" required />
                    <input type="number" step="0.1" value={numericInputs.naohGrams} onChange={e => handleNumericChange('naohGrams', e.target.value)} className="bg-gray-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-orange-500 text-white" placeholder="Massa de NaOH pura (g)" required />
                  </div>
                )}
                {mission.id === 5 && (
                  <div className="grid grid-cols-2 gap-4 bg-red-900/10 p-4 border border-red-500/30 rounded-2xl">
                     <div className="col-span-2"><h3 className="font-bold text-red-400">🌡️ Fator Termodinâmico</h3></div>
                    <input type="number" step="1" value={numericInputs.startTemp} onChange={e => handleNumericChange('startTemp', e.target.value)} className="bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white" placeholder="Temp Inicial (°C)" required />
                    <input type="number" step="1" value={numericInputs.endTemp} onChange={e => handleNumericChange('endTemp', e.target.value)} className="bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white" placeholder="Pico de Temperatura (°C)" required />
                  </div>
                )}
                {mission.id === 8 && (
                  <div className="bg-indigo-900/10 p-4 border border-indigo-500/30 rounded-2xl">
                     <h3 className="font-bold text-indigo-400 mb-2">📊 Escala de Alcalinidade (pH)</h3>
                    <input type="number" step="0.5" value={numericInputs.phLevel} onChange={e => handleNumericChange('phLevel', e.target.value)} className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white" placeholder="Leitura Universal Final" required />
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setStep(1)} className="px-6 py-4 bg-gray-800 rounded-xl text-white font-bold hover:bg-gray-700 transition">← Revisar Briefing</button>
                  <button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-lg transition">Validar Procedimento</button>
                </div>
             </form>
          )}

          {/* STEP 3: FOTOGRAFIA E SUBMISSÃO FINAL */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in text-center">
              <h2 className="text-2xl font-bold text-emerald-400 mb-2">Câmera de Evidências</h2>
              <p className="text-gray-400 text-sm mb-6">A agência escolar exige prova material limpa do estado final da bancada em cada fase para liberar os Céditos de XP.</p>
              
              <div className="border-2 border-dashed border-gray-600 rounded-2xl p-8 hover:border-emerald-500/50 hover:bg-emerald-900/10 transition group cursor-pointer relative">
                <input type="file" accept="image/*" onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setEvidencePhoto(e.target.files[0]);
                    setPhotoPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                
                {photoPreview ? (
                  <img src={photoPreview} alt="Upload" className="mx-auto rounded-xl w-full max-h-64 object-cover shadow-2xl border border-white/10" />
                ) : (
                  <div className="py-10">
                    <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform">📸</span>
                    <span className="text-emerald-500 font-bold block">Tocar ou arrastar foto do celular/PC aqui</span>
                    <span className="text-xs text-gray-500 mt-2 block">JPG ou PNG (Até 5MB)</span>
                    {squadId === 'visitor-sandbox' && (
                      <span className="text-xs text-amber-500 mt-2 block font-bold">⚠️ Modo Visitante: A foto não será enviada ao servidor.</span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <button disabled={loading} onClick={() => setStep(2)} className="px-6 py-4 bg-gray-800 rounded-xl text-white disabled:opacity-50">Voltar</button>
                <button disabled={loading} onClick={() => submitToServer()} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Sincronizando Blockchain Servidor...' : (squadId === 'visitor-sandbox' ? 'Simular Diário Local 🔒' : 'Autenticar Diário 🔒')}
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default MissionReactor;
