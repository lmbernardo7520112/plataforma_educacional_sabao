import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useJourneyStore } from '../core/store/useJourneyStore';

interface IClassroom {
  _id: string;
  nome: string;
  ano: number;
}

interface IClassroomDetails extends IClassroom {
  qtdSquads: number;
  alunosOriginal: { numero: string; nome: string }[];
}

interface ISquad {
  _id: string;
  nome: string;
  memberCount?: number;
  members?: string[];
}

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const setSquad = useJourneyStore((state) => state.setSquad);
  
  const [step, setStep] = useState<1 | 2>(1);
  const [classrooms, setClassrooms] = useState<IClassroom[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState<IClassroomDetails | null>(null);
  
  // Squad Resumption State
  const [existingSquads, setExistingSquads] = useState<ISquad[]>([]);
  const [editingSquad, setEditingSquad] = useState<ISquad | null>(null);
  
  // Squad Creation/Edit Form
  const [squadName, setSquadName] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load classrooms on mount
  useEffect(() => {
    const fetchClassrooms = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/onboarding/classrooms');
        setClassrooms(data.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Erro ao carregar turmas na rede principal.');
        } else {
          setError('Falha imprevisível no motor do laboratório.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchClassrooms();
  }, []);

  const handleSelectClassroom = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      // Parallel execution: Gets Classroom details mapping AND Existing Squads Array
      const [classRes, squadsRes] = await Promise.all([
        api.get(`/onboarding/classrooms/${id}`),
        api.get(`/onboarding/classrooms/${id}/squads`)
      ]);
      
      setSelectedClassroom(classRes.data.data);
      setExistingSquads(squadsRes.data.data);
      setStep(2);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Erro ao mapear a turma.');
      } else {
        setError('Ocorreu um erro no acesso à turma selecionada.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = async (e: React.MouseEvent, squad: ISquad) => {
    e.stopPropagation(); // Evita login acidental
    const code = window.prompt(`Digite o código de acesso de 8 dígitos para editar a bancada "${squad.nome}":`);
    if (!code || !code.trim()) return;

    setLoading(true);
    setError(null);
    try {
      // Autentica via login-by-code para provar propriedade
      const { data: authData } = await api.post('/auth/squad/login-by-code', { accessCode: code.trim().toUpperCase() });
      const fullSquadDetail = await api.get(`/squads/standalone/${squad._id}`, {
        headers: { Authorization: `Bearer ${authData.data.token}` }
      });
      const fullSquad = fullSquadDetail.data.data;
      
      setEditingSquad(squad);
      setSquadName(fullSquad.nome);
      setSelectedStudents(fullSquad.members || []);
      // Guarda temporariamente o token autenticado de edição
      (window as any)._tempEditingToken = authData.data.token;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Código de acesso incorreto. Edição negada.');
      } else {
        setError('Não foi possível autenticar a bancada para edição.');
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingSquad(null);
    setSquadName('');
    setSelectedStudents([]);
    setError(null);
    delete (window as any)._tempEditingToken;
  };

  const handleSelectExistingSquad = (squad: ISquad) => {
    setError(null);
    setError(`Para entrar na bancada "${squad.nome}", insira o código de acesso ao lado.`);
  };

  const handleLoginByCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const code = accessCode.trim().toUpperCase();
      const { data } = await api.post('/auth/squad/login-by-code', { accessCode: code });
      
      localStorage.setItem('ecosabon_token', data.data.token);
      
      // Busca os detalhes completos da bancada autenticada para obter os membros
      const squadId = data.data.squad._id;
      const squadDetailRes = await api.get(`/squads/standalone/${squadId}`, {
        headers: { Authorization: `Bearer ${data.data.token}` }
      });
      const fullSquad = squadDetailRes.data.data;

      setSquad(
        selectedClassroom._id,
        selectedClassroom.nome,
        fullSquad._id,
        fullSquad.nome,
        fullSquad.members || []
      );
      
      navigate('/dashboard');
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Código de acesso inválido ou bancada inativa.');
      } else {
        setError('Falha de rede ao autenticar com o código.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEnterAsVisitor = () => {
    localStorage.removeItem('ecosabon_token');
    setSquad(
      'visitor-classroom',
      'Turma de Demonstração',
      'visitor-sandbox',
      'Visitante Sandbox',
      ['Visitante']
    );
    navigate('/dashboard');
  };

  const toggleStudent = (nome: string) => {
    setSelectedStudents(prev => {
      if (prev.includes(nome)) return prev.filter(n => n !== nome);
      if (prev.length >= 5) return prev; // Max 5 limit frontend
      return [...prev, nome];
    });
  };

  const handleSaveSquad = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassroom) return;
    if (selectedStudents.length < 1 || selectedStudents.length > 5) {
      setError('A bancada precisa conter de 1 a no máximo 5 pesquisadores.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (editingSquad) {
        const tempToken = (window as any)._tempEditingToken;
        if (!tempToken) {
          setError('Sessão de edição expirada. Autentique-se novamente.');
          return;
        }
        
        await api.put(`/classrooms/${selectedClassroom._id}/squads/${editingSquad._id}`, {
          nome: squadName,
          members: selectedStudents,
        }, { headers: { Authorization: `Bearer ${tempToken}` } });

        // Refresh List
        const squadsRes = await api.get(`/onboarding/classrooms/${selectedClassroom._id}/squads`);
        setExistingSquads(squadsRes.data.data);
        cancelEdit();
        setError('✅ Bancada atualizada com sucesso! Selecione-a para entrar no laboratório.');
      } else {
        // Create squad via API First (Retorna Nativamente Payload RBAC)
        const { data } = await api.post(`/classrooms/${selectedClassroom._id}/squads`, {
          nome: squadName,
          members: selectedStudents,
        });

        // Storage do token da Escola
        localStorage.setItem('ecosabon_token', data.token);

        // Update local Zustand state
        setSquad(
          selectedClassroom._id, 
          selectedClassroom.nome, 
          data.data._id, 
          data.data.nome, 
          data.data.members
        );
        
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Erro do Zod Validator na comunicação.');
      } else {
        setError('Erro estrutural do formulário químico.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white flex items-center justify-center p-4 md:p-6 font-['Inter'] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      <div className={`w-full z-10 transition-all duration-500 ease-in-out ${step === 2 ? 'max-w-5xl' : 'max-w-xl'}`}>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black font-['Outfit'] mb-2"><span className="text-blue-500">Eco</span>Sabon</h1>
          <p className="text-gray-400">Plataforma de Química Experimental Educacional</p>
        </div>

        {error && (
          <div className="bg-red-900/40 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 text-sm text-center animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            {error}
          </div>
        )}

        {/* ===================== STEP 1: CLASSROOM SELECTION ===================== */}
        {step === 1 && (
          <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="bg-blue-600/20 text-blue-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 
              Identificação de Turma
            </h2>
            
            {loading ? (
              <div className="text-center py-8 text-gray-400 animate-pulse">Estabelecendo link seguro...</div>
            ) : classrooms.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Nenhum núcleo acadêmico ativo no sistema.</div>
            ) : (
              <div className="grid gap-4">
                {classrooms.map((c) => (
                  <button
                    key={c._id}
                    onClick={() => handleSelectClassroom(c._id)}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-blue-500/50 hover:from-blue-500/10 transition-all group"
                  >
                    <div className="text-left">
                      <div className="font-bold text-lg group-hover:text-blue-400 transition-colors">{c.nome}</div>
                      <div className="text-xs text-gray-400">Ano Letivo {c.ano}</div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition text-blue-400">→</div >
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================== STEP 2: SQUAD RESUMPTION OR CREATION ===================== */}
        {step === 2 && selectedClassroom && (
          <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-fade-in flex flex-col lg:max-h-[85vh] max-h-none overflow-y-auto lg:overflow-y-visible">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="bg-emerald-600/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> 
                Conectar ao Laboratório: <span className="text-white ml-2">{selectedClassroom.nome}</span>
              </h2>
              <button onClick={() => setStep(1)} className="text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-gray-400 hover:text-white transition">Trocar Turma</button>
            </div>
            
            {/* Split Screen Engine */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:overflow-hidden overflow-visible flex-1 min-h-0">
              
              {/* LEFT COLUMN: RESUMPTION (RETOMAR BANCADA) */}
              <div className="flex-1 lg:border-r border-white/10 lg:pr-8 flex flex-col min-h-0">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                    <span>🔄</span> Retomar Diário Existente
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Sua equipe já formou a bancada em uma aula passada? Clique nela para voltar pro projeto.</p>
                </div>
                
                <div className="custom-scrollbar overflow-y-auto pr-2 space-y-3 flex-1 pb-4 min-h-[200px]">
                  {existingSquads.length === 0 ? (
                    <div className="text-gray-500 text-sm p-6 bg-black/30 rounded-2xl border border-white/5 text-center h-full flex items-center justify-center">
                      O laboratório da sua turma está completamente vazio. Inaugure a primeira bancada ao lado 👉
                    </div>
                  ) : (
                    existingSquads.map(s => (
                      <div 
                        key={s._id}
                        onClick={() => handleSelectExistingSquad(s)}
                        className={`w-full text-left p-4 rounded-xl bg-black/40 border transition-all flex flex-col gap-2 group shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] relative overflow-hidden cursor-pointer
                         ${editingSquad?._id === s._id ? 'border-orange-500/50 bg-orange-600/10' : 'border-white/10 hover:border-blue-500/50 hover:bg-blue-600/10'}`}
                      >
                         <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                         <div className="flex justify-between items-center relative z-10">
                           <span className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{s.nome}</span>
                           <div className="flex gap-2 items-center">
                             <button onClick={(e) => handleEditClick(e, s)} className="text-gray-400 hover:text-orange-400 text-xs px-2 py-1 bg-black/50 rounded-md transition border border-gray-700 hover:border-orange-500/50">✏️ Editar</button>
                             <span className="text-xs bg-gray-800 border border-gray-700 px-2 py-1 rounded-md text-gray-300 font-mono">{(s.memberCount !== undefined ? s.memberCount : (s.members ? s.members.length : 0))}/5 Vagas</span>
                           </div>
                         </div>
                         <div className="text-xs text-gray-400 truncate relative z-10">
                           {s.members && s.members.length > 0 ? s.members.join(' • ') : ''}
                         </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: CREATION/EDIT FORM */}
              <div className="flex-1 flex flex-col min-h-0">
                {editingSquad ? (
                  <div className="mb-6 flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2 text-orange-400">
                        <span>✏️</span> Editando Bancada
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">Faça as correções de listagem de nomes e encerre a edição.</p>
                    </div>
                    <button onClick={cancelEdit} type="button" className="text-xs bg-gray-800 hover:bg-gray-700 border border-gray-600 px-3 py-1.5 rounded-lg transition text-gray-300">
                      Cancelar Edição
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-900/40 border border-white/5 rounded-3xl p-6 flex flex-col flex-1 my-4 animate-fade-in">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                        <span>🔑</span> Acesso à Bancada
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">Insira o código de 8 caracteres fornecido pelo seu professor.</p>
                    </div>

                    <form onSubmit={handleLoginByCode} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          required
                          value={accessCode}
                          onChange={(e) => setAccessCode(e.target.value)}
                          placeholder="Código de Acesso (Ex: EEE8EF)"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-center font-mono font-bold tracking-widest text-lg uppercase focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition shadow-inner"
                          maxLength={12}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading || !accessCode.trim()}
                        className="w-full text-white font-bold py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-lg disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                      >
                        {loading ? 'Validando código...' : 'Entrar na Bancada 🧪'}
                      </button>
                    </form>

                    <div className="relative my-6 flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/5"></div>
                      </div>
                      <span className="relative bg-[#0a0f1a] px-3 text-xs text-gray-500 uppercase tracking-widest">Ou</span>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={handleEnterAsVisitor}
                        className="w-full text-gray-300 font-bold py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition uppercase tracking-wider text-sm"
                      >
                        Acessar como Visitante 👤
                      </button>
                      <p className="text-[10px] text-gray-500 text-center leading-relaxed">
                        Modo Sandbox: Qualquer pessoa pode navegar na plataforma para conhecer as etapas, mas sem salvar dados na nuvem da escola.
                      </p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5 flex items-start gap-2.5 opacity-60">
                      <span className="text-sm">🔒</span>
                      <p className="text-[10px] text-gray-400 leading-normal">
                        <strong>Governança Ativa:</strong> Alunos não possuem privilégios administrativos para fundar bancadas diretamente no banco.
                      </p>
                    </div>
                  </div>
                )}
                
                {editingSquad && (
                  <form onSubmit={handleSaveSquad} className="flex flex-col flex-1 pb-4 animate-fade-in">
                  <div className="mb-3.5">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Denominação da Equipe</label>
                    <input 
                      type="text" 
                      required
                      value={squadName}
                      onChange={e => setSquadName(e.target.value)}
                      placeholder="Ex: Fórmula Genial, Cientistas..."
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition shadow-inner"
                      maxLength={50}
                      minLength={3}
                    />
                  </div>

                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex justify-between items-end mb-2.5">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Integrantes Autorizados</label>
                      <span className={`text-xs px-2 py-1 rounded bg-black/50 border ${selectedStudents.length === 5 ? 'text-emerald-400 border-emerald-500/50' : 'text-gray-400 border-gray-800'}`}>
                        {selectedStudents.length} / 5
                      </span>
                    </div>
                    
                    {selectedClassroom.alunosOriginal.length === 0 ? (
                      <div className="text-sm text-gray-500 py-8 px-4 border border-dashed border-gray-700 bg-black/20 rounded-2xl text-center flex-1 flex flex-col items-center justify-center">
                        <span className="text-2xl mb-2">📁</span>
                        O sistema da escola ainda não enviou os alunos desta turma.
                      </div>
                    ) : (
                      <div className="overflow-y-auto pr-3 space-y-2 custom-scrollbar max-h-[110px] min-h-[80px] flex-1 border border-white/5 bg-black/20 p-2 rounded-2xl">
                        {selectedClassroom.alunosOriginal.map((aluno) => {
                          const isSelected = selectedStudents.includes(aluno.nome);
                          const isDisabled = !isSelected && selectedStudents.length >= 5;
                          return (
                            <div 
                              key={aluno.numero}
                              onClick={() => !isDisabled && toggleStudent(aluno.nome)}
                              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200
                                ${isSelected ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_4px_15px_-3px_rgba(16,185,129,0.1)]' : 'bg-black/40 border-white/5 hover:bg-white/5 hover:border-white/20'}
                                ${isDisabled ? 'opacity-40 cursor-not-allowed grayscale' : ''}
                              `}
                            >
                              <div className={`w-5 h-5 rounded border flex flex-shrink-0 items-center justify-center transition-colors
                                ${isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-gray-600 bg-black/50'}
                              `}>
                                {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <span className="text-gray-500 font-mono text-xs w-6 text-right select-none">{aluno.numero}</span>
                              <span className={`truncate select-none ${isSelected ? 'text-emerald-100 font-bold' : 'text-gray-300 font-medium'}`}>{aluno.nome}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading || selectedStudents.length === 0}
                    className={`w-full mt-3 text-white font-bold py-2.5 rounded-xl transition shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-lg disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed uppercase tracking-wider text-sm
                      ${editingSquad ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'}
                    `}
                  >
                    {loading ? 'Sincronizando Banco de Dados...' : (editingSquad ? 'Salvar Alterações da Cátedra ✅' : 'Autenticar Novo Laboratório 🧪')}
                  </button>
                </form>
                )}
              </div>

            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Onboarding;
