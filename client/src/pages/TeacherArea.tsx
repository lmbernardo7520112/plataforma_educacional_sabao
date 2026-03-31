import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../lib/api';
import { useNavigate } from 'react-router-dom';

interface ISquad {
  _id: string;
  nome: string;
  members: string[];
}

interface IClassroom {
  _id: string;
  nome: string;
  ano: number;
}

export const TeacherArea: React.FC = () => {
  const [teacherToken, setTeacherToken] = useState<string | null>(localStorage.getItem('ecosabon_teacher_token'));
  
  // Login State
  const [email, setEmail] = useState('admin@ecosabon.com');
  const [password, setPassword] = useState('123456');
  const [loginError, setLoginError] = useState('');
  
  // Dashboard State
  const [classrooms, setClassrooms] = useState<IClassroom[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState<IClassroom | null>(null);
  const [squads, setSquads] = useState<ISquad[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const navigate = useNavigate();

  // Axios local instance com o token administrativo
  const teacherApi = axios.create({ baseURL: '/api' });
  teacherApi.interceptors.request.use(config => {
    if (teacherToken) config.headers.Authorization = `Bearer ${teacherToken}`;
    return config;
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      const { data } = await api.post('/auth/teacher/login', { email, password });
      localStorage.setItem('ecosabon_teacher_token', data.data.token);
      setTeacherToken(data.data.token);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) setLoginError(err.response?.data?.message || 'Acesso Restrito Recusado.');
      else setLoginError('Servidor Docente inoperável.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ecosabon_teacher_token');
    setTeacherToken(null);
  };

  // Carregar turmas quando autênticado
  useEffect(() => {
    if (!teacherToken) return;
    
    teacherApi.get('/classrooms')
      .then(res => setClassrooms(res.data.data))
      .catch((err) => {
         if (err.response?.status === 401) handleLogout();
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherToken]);

  const loadSquads = async (classroom: IClassroom) => {
    setSelectedClassroom(classroom);
    setLoading(true);
    try {
      const { data } = await teacherApi.get(`/classrooms/${classroom._id}/squads`);
      setSquads(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSquad = async (squadId: string) => {
    if (!selectedClassroom) return;
    const isConfirmed = window.confirm('DELEÇÃO EM CASCATA: Apagar esta bancada excluirá permanentemente os alunos e todas as fotos do laboratório deles. Confirma?');
    if (!isConfirmed) return;

    setProcessingId(squadId);
    try {
      await teacherApi.delete(`/classrooms/${selectedClassroom._id}/squads/${squadId}`);
      // Refresh local array
      setSquads(prev => prev.filter(s => s._id !== squadId));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) alert('Falha Administrativa: ' + (err.response?.data?.message || 'Erro Desconhecido'));
    } finally {
      setProcessingId(null);
    }
  };

  if (!teacherToken) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-6 font-['Inter'] relative overflow-hidden">
        {/* EcoSabon Organic Glow Effects */}
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#10B981]/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] rounded-full bg-[#3B82F6]/10 blur-[120px]" />
        
        <div className="bg-[#0a0f1a]/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl max-w-md w-full z-10 relative">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-2 font-['Outfit'] font-extrabold text-3xl tracking-tight text-white mb-2">
              <span className="text-[#10B981]">Eco</span>
              <span>Sabon</span>
            </div>
            <h1 className="text-xl font-bold font-['Outfit'] text-[#F59E0B]">Área do Professor</h1>
            <p className="text-gray-400 text-sm mt-2">Acesso restrito à Direção Acadêmica.</p>
          </div>
          
          {loginError && <div className="bg-red-500/20 text-red-200 p-3 rounded-lg mb-6 text-sm border border-red-500/50 text-center">{loginError}</div>}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-400 text-xs font-bold uppercase mb-2">E-mail Institucional</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#F59E0B] focus:outline-none transition" />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Senha Master</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#F59E0B] focus:outline-none transition" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:opacity-90 text-white font-bold py-4 rounded-xl transition disabled:opacity-50 mt-4 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              {loading ? 'Acessando Reitoria...' : 'Autenticar Área Administrativa'}
            </button>
            <button type="button" onClick={() => navigate('/')} className="w-full text-gray-500 text-sm hover:text-white transition">← Voltar à página pública</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-['Inter']">
      <nav className="border-b border-white/10 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <span className="bg-red-600 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl cursor-default">🧑‍🏫</span>
             <div>
               <h1 className="font-['Outfit'] font-black text-xl leading-none">Área do Professor</h1>
               <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Painel Administrativo RBAC</span>
             </div>
          </div>
          <button onClick={handleLogout} className="border border-red-500/50 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-bold transition">Deslogar</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8 items-start">
        {/* Lado Esquerdo - Turmas */}
        <div className="w-full md:w-1/3 bg-gray-900/60 border border-white/10 p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold mb-6 text-gray-300 font-['Outfit']">1. Turmas Ativas</h2>
          {classrooms.length === 0 ? (
            <div className="text-gray-500 text-sm">Nenhuma turma gerada. Rode o Seed de População.</div>
          ) : (
            <div className="space-y-3">
              {classrooms.map(c => (
                <button 
                  key={c._id} onClick={() => loadSquads(c)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedClassroom?._id === c._id 
                    ? 'bg-red-600/20 border-red-500/50 text-white' 
                    : 'bg-black/30 border-white/5 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-lg">{c.nome}</div>
                  <div className="text-xs uppercase mt-1 tracking-wider opacity-60">Ano Base {c.ano}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lado Direito - Gestão de CRUD */}
        <div className="w-full md:w-2/3">
          {!selectedClassroom ? (
            <div className="bg-gray-900/30 border border-dashed border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center text-gray-500">
               <span className="text-5xl mb-4 opacity-50">📁</span>
               <h3 className="text-xl">Selecione uma turma ao lado</h3>
               <p className="text-sm">Para visualizar e gerenciar o histórico das bancadas</p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold text-white font-['Outfit']">2. Bancadas: {selectedClassroom.nome}</h2>
                <span className="bg-white/10 px-3 py-1 rounded text-xs text-gray-400 font-mono">Total de Grupos: {squads.length}</span>
              </div>
              
               {loading ? (
                 <div className="text-center py-10 animate-pulse text-gray-500">Sincronizando Banco de Dados SDD...</div>
               ) : squads.length === 0 ? (
                 <div className="bg-black/40 border border-white/10 rounded-2xl p-8 text-center text-gray-500">O Laboratório está com as bancadas vazias nesta turma.</div>
               ) : (
                 <div className="grid gap-4 custom-scrollbar">
                   {squads.map(s => (
                     <div key={s._id} className="bg-black/40 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-white/30 transition">
                        <div>
                          <div className="font-bold text-xl text-white flex items-center gap-2">
                             {s.nome}
                          </div>
                          <div className="text-sm text-gray-400 mt-2">
                            Integrantes: <span className="text-gray-300">{s.members.join(' • ')}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                           <span className="text-xs px-2 py-1 bg-red-900/30 text-red-300 rounded border border-red-500/20 font-mono">
                             ID: {s._id.slice(-6)}
                           </span>
                           <button 
                             onClick={() => handleDeleteSquad(s._id)}
                             disabled={processingId === s._id}
                             className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500 p-2 rounded-lg font-bold transition flex items-center gap-2 disabled:opacity-50"
                           >
                             🗑️ {processingId === s._id ? 'Caindo em Cascata...' : 'Apagar'}
                           </button>
                        </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TeacherArea;
