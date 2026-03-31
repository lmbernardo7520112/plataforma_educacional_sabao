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

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const setSquad = useJourneyStore((state) => state.setSquad);
  
  const [step, setStep] = useState<1 | 2>(1);
  const [classrooms, setClassrooms] = useState<IClassroom[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState<IClassroomDetails | null>(null);
  
  // Squad Form
  const [squadName, setSquadName] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load classrooms on mount
  useEffect(() => {
    const fetchClassrooms = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/classrooms');
        setClassrooms(data.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Erro ao carregar turmas');
        } else {
          setError('Erro inesperado');
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
      const { data } = await api.get(`/classrooms/${id}`);
      setSelectedClassroom(data.data);
      setStep(2);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Erro ao carregar turma');
      } else {
        setError('Erro inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleStudent = (nome: string) => {
    setSelectedStudents(prev => {
      if (prev.includes(nome)) return prev.filter(n => n !== nome);
      if (prev.length >= 5) return prev; // Max 5 limit frontend
      return [...prev, nome];
    });
  };

  const handleCreateSquad = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassroom) return;
    if (selectedStudents.length < 1 || selectedStudents.length > 5) {
      setError('A bancada deve ter de 1 a 5 membros.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Create squad via API
      const { data } = await api.post(`/classrooms/${selectedClassroom._id}/squads`, {
        nome: squadName,
        members: selectedStudents,
      });

      // Update local Zustand state
      setSquad(
        selectedClassroom._id, 
        selectedClassroom.nome, 
        data.data._id, 
        data.data.nome, 
        data.data.members
      );
      
      // Navigate to Dashboard
      navigate('/dashboard');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Erro ao formar bancada. Verifique o nome.');
      } else {
        setError('Erro inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white flex items-center justify-center p-6 font-['Inter'] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-xl z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black font-['Outfit'] mb-2"><span className="text-blue-500">Eco</span>Sabon</h1>
          <p className="text-gray-400">Plataforma de Química Experimental Educacional</p>
        </div>

        {error && (
          <div className="bg-red-900/40 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="bg-blue-600/20 text-blue-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 
              Selecione sua Turma
            </h2>
            
            {loading ? (
              <div className="text-center py-8 text-gray-400">Carregando turmas...</div>
            ) : classrooms.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Nenhuma turma ativa encontrada.</div>
            ) : (
              <div className="grid gap-4">
                {classrooms.map((c) => (
                  <button
                    key={c._id}
                    onClick={() => handleSelectClassroom(c._id)}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
                  >
                    <div className="text-left">
                      <div className="font-bold text-lg">{c.nome}</div>
                      <div className="text-xs text-gray-400">Ano Letivo {c.ano}</div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition text-blue-400">→</div >
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 2 && selectedClassroom && (
          <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="bg-emerald-600/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> 
                Formar Bancada
              </h2>
              <button onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-white transition">← Voltar</button>
            </div>
            
            <div className="bg-white/5 px-4 py-3 rounded-xl mb-6 flex justify-between items-center text-sm">
              <span className="text-gray-400">Turma:</span>
              <span className="font-bold text-white">{selectedClassroom.nome}</span>
            </div>

            <form onSubmit={handleCreateSquad} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Nome do Grupo (Bancada)</label>
                <input 
                  type="text" 
                  required
                  value={squadName}
                  onChange={e => setSquadName(e.target.value)}
                  placeholder="Ex: Bancada Alpha, Equipe Química..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  maxLength={50}
                  minLength={3}
                />
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-sm font-bold text-gray-300">Selecione os Membros</label>
                  <span className={`text-xs ${selectedStudents.length === 5 ? 'text-emerald-400 font-bold' : 'text-gray-500'}`}>
                    {selectedStudents.length} / 5
                  </span>
                </div>
                
                {selectedClassroom.alunosOriginal.length === 0 ? (
                  <div className="text-sm text-gray-500 p-4 border border-dashed border-gray-700 rounded-xl text-center">
                    Nenhum aluno cadastrado nesta turma ainda. Peça ao professor para atualizar o sistema.
                  </div>
                ) : (
                  <div className="max-h-60 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                    {selectedClassroom.alunosOriginal.map((aluno) => {
                      const isSelected = selectedStudents.includes(aluno.nome);
                      const isDisabled = !isSelected && selectedStudents.length >= 5;
                      return (
                        <div 
                          key={aluno.numero}
                          onClick={() => !isDisabled && toggleStudent(aluno.nome)}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                            ${isSelected ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-black/30 border-white/10 hover:bg-white/5'}
                            ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                          `}
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center
                            ${isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-gray-500 bg-transparent'}
                          `}>
                            {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span className="text-gray-400 font-mono text-xs w-6">{aluno.numero}</span>
                          <span className={`${isSelected ? 'text-white font-bold' : 'text-gray-300'}`}>{aluno.nome}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={loading || selectedStudents.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Inicializando Bancada...' : 'Iniciar Experimento 🚀'}
              </button>
            </form>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Onboarding;
