/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { MISSION_DEFINITIONS } from '../../../shared/config/missions';

export const GroupReport: React.FC = () => {
  const { squadId } = useParams<{ squadId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!squadId) return;
    setLoading(true);
    // Tenta buscar com o Axios Interceptor padrão (Token já embutido nele)
    api.get(`/report/squads/${squadId}`)
      .then((res) => setData(res.data.data))
      .catch((err) => {
         setError(err.response?.data?.message || 'Erro ao carregar consolidado.');
      })
      .finally(() => setLoading(false));
  }, [squadId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white text-black print:hidden">Auditando Blocos de Anotações...</div>;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black print:hidden space-y-4 text-center">
        <h1 className="text-2xl font-bold font-['Outfit'] text-red-600">Acesso Restrito</h1>
        <p className="max-w-md">{error}</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded font-bold transition">← Retornar</button>
      </div>
    );
  }

  const { squad, missions: stateMissions } = data;

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white text-black font-['Inter'] selection:bg-blue-200">
      
      {/* Botões Utilitários (Ocultos na Impressão) */}
      <div className="print:hidden sticky top-0 bg-white/90 backdrop-blur border-b border-gray-200 p-4 flex justify-between items-center shadow-sm z-50">
        <button onClick={() => navigate(-1)} className="text-sm font-bold text-gray-500 hover:text-black">← Voltar</button>
        <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded shadow transition">
          🖨️ Imprimir / Gravar PDF
        </button>
      </div>

      {/* Papel Carta (A4) do Dossiê */}
      <main className="max-w-4xl mx-auto bg-white print:p-0 p-10 print:shadow-none shadow-xl my-8 print:my-0">
        
        {/* Cabeçalho Escolar Oficial */}
        <header className="border-b-4 border-black pb-8 mb-8 text-center flex flex-col items-center">
           <div className="font-['Outfit'] font-extrabold text-4xl tracking-tight mb-2">
             <span className="text-emerald-700">Eco</span>
             <span className="text-black">Sabon</span>
           </div>
           <h1 className="text-xl tracking-widest uppercase font-bold text-gray-800">Dossiê Científico de Estudo</h1>
           <p className="text-gray-500 text-sm mt-1">Saponificação Ecológica e Reciclagem</p>
        </header>

        {/* Ficha Catalográfica / Identificação */}
        <section className="bg-gray-50 border border-black p-6 mb-10 print:break-inside-avoid shadow-sm">
           <div className="grid grid-cols-2 gap-6">
             <div>
               <p className="text-xs uppercase font-bold text-gray-500 tracking-widest">Bancada Operacional</p>
               <h2 className="text-2xl font-black font-['Outfit']">{squad.nome}</h2>
               <p className="text-sm mt-1">ID Mongoose: <span className="font-mono text-gray-600">{squad._id}</span></p>
             </div>
             <div className="border-l border-gray-300 pl-6">
               <p className="text-xs uppercase font-bold text-gray-500 tracking-widest">Turma / Ciclo</p>
               <h3 className="text-xl font-bold">{squad.classroomId.nome}</h3>
               <p className="text-sm text-gray-600">Ano Letivo Base: {squad.classroomId.ano}</p>
             </div>
           </div>
           <div className="mt-6 pt-4 border-t border-gray-200">
             <p className="text-xs uppercase font-bold text-gray-500 tracking-widest mb-2">Engenheiros Ambientais do Ciclo</p>
             <div className="flex flex-wrap gap-2">
                {squad.members.map((m: string, i: number) => (
                  <span key={i} className="bg-white border border-black px-3 py-1 text-sm font-semibold">{m}</span>
                ))}
             </div>
           </div>
        </section>

        {/* Corpo do Relatório: Extrato das Missões Submetidas */}
        {stateMissions.length === 0 ? (
           <div className="text-center py-20 text-gray-400 italic font-medium">Os alunos desta bancada não iniciaram as experimentações científicas. O Diário está vazio.</div>
        ) : (
          <div className="space-y-12">
            {stateMissions.map((jState: any) => {
               // Resgatar a definição estética da Missão (Title/Badge)
               const missionDef = MISSION_DEFINITIONS.find(m => m.id === jState.missionId);
               const dataDoc = jState;
               
               // Se existe uma foto, nós forçamos uma quebra limpa no PDF
               const breakPageClass = dataDoc.evidenceUrl ? "print:break-inside-avoid mt-8" : "mt-8";

               return (
                 <article key={jState._id} className={`border-l-4 border-blue-600 pl-6 py-2 ${breakPageClass}`}>
                   <h3 className="text-blue-700 font-bold uppercase text-xs tracking-widest mb-1">Módulo Científico 0{jState.missionId}</h3>
                   <h4 className="text-2xl font-black font-['Outfit'] mb-4 bg-gray-100 inline-block px-3 py-1">{missionDef?.title || 'Fase Oculta'}</h4>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 mt-4">
                     
                     {/* Textos Argumentativos */}
                     <div className="space-y-6">
                       {dataDoc.scientificMethod?.hypothesis && (
                         <div>
                           <strong className="block text-black text-sm uppercase mb-1">💡 Hipótese Teórica</strong>
                           <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-gray-300">{dataDoc.scientificMethod.hypothesis}</p>
                         </div>
                       )}
                       {dataDoc.scientificMethod?.procedure && (
                         <div>
                           <strong className="block text-black text-sm uppercase mb-1">⚙️ Memorial Descritivo</strong>
                           <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-gray-300">{dataDoc.scientificMethod.procedure}</p>
                         </div>
                       )}
                       {dataDoc.scientificMethod?.observations && (
                         <div>
                           <strong className="block text-black text-sm uppercase mb-1">🔬 Observações Empíricas</strong>
                           <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-gray-300">{dataDoc.scientificMethod.observations}</p>
                         </div>
                       )}
                       {dataDoc.scientificMethod?.conclusion && (
                         <div>
                           <strong className="block text-black text-sm uppercase mb-1">✅ Conclusão Autoral</strong>
                           <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-emerald-500 font-medium">{dataDoc.scientificMethod.conclusion}</p>
                         </div>
                       )}

                       {/* Constantes Químicas (Ph, Masse, etc) */}
                       {dataDoc.numericInputs && Object.keys(dataDoc.numericInputs).length > 0 && (
                         <div className="bg-gray-50 border border-gray-300 p-4 shadow-sm">
                           <strong className="block text-black text-sm uppercase mb-3">Tabela de Variáveis Termoquímicas</strong>
                           <div className="grid grid-cols-2 gap-2 text-sm font-mono text-gray-700">
                             {dataDoc.numericInputs.oilMassGrams && <div><span className="text-gray-400">Óleo:</span> {dataDoc.numericInputs.oilMassGrams}g</div>}
                             {dataDoc.numericInputs.naohGrams && <div><span className="text-gray-400">NaOH:</span> {dataDoc.numericInputs.naohGrams}g</div>}
                             {dataDoc.numericInputs.startTemp && <div><span className="text-gray-400">T. Inicio:</span> {dataDoc.numericInputs.startTemp}°C</div>}
                             {dataDoc.numericInputs.endTemp && <div><span className="text-gray-400">T. Fim:</span> {dataDoc.numericInputs.endTemp}°C</div>}
                             {dataDoc.numericInputs.phLevel && <div><span className="text-gray-400">pH Aferido:</span> {dataDoc.numericInputs.phLevel}</div>}
                           </div>
                         </div>
                       )}
                     </div>

                     {/* Anexo de Foto (Se tiver) */}
                     {dataDoc.evidenceUrl && (
                       <div className="flex flex-col">
                         <strong className="block text-black text-sm uppercase mb-2 text-center md:text-right">📸 Evidência Fotográfica</strong>
                         <div className="bg-gray-100 p-2 border border-black shadow">
                            <img src={dataDoc.evidenceUrl} alt="Laboratório" className="w-full h-auto max-h-[300px] object-cover filter contrast-125 grayscale" />
                         </div>
                         <p className="text-[10px] text-gray-500 uppercase mt-2 text-center md:text-right font-mono">Registro Original submetido ao Módulo do Servidor.</p>
                       </div>
                     )}

                   </div>
                 </article>
               );
            })}
          </div>
        )}

      </main>

    </div>
  );
};
export default GroupReport;
