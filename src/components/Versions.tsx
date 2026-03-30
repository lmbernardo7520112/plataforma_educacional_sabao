import React from 'react';

const Versions: React.FC = () => {
  return (
    <section className="py-24 bg-[#111827] relative overflow-hidden" id="versions">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Outfit'] text-white">
            Inclusão e <span className="gradient-text-primary">Adaptação</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Acreditamos que a ciência deve ser acessível a todas as realidades escolares.
            O EcoSabon traz a garantia do mesmo rigor pedagógico, com ou sem hardware IoT.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mt-16 relative">
          {/* Version A */}
          <div className="flex-1 w-full max-w-lg p-10 lg:p-12 relative rounded-3xl bg-gray-900/60 backdrop-blur-xl border border-[#3B82F6]/40 shadow-[0_10px_30px_rgba(59,130,246,0.1)] hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute -top-4 left-8 bg-[#0a0f1a] px-6 py-1.5 rounded-full font-bold text-sm text-[#3B82F6] border border-[#3B82F6]">
              High-Tech
            </div>
            <h3 className="text-3xl font-bold mb-2 text-white">Versão A: Sensores IoT</h3>
            <p className="text-gray-400 mb-8 min-h-[48px]">Integração nativa com microcontroladores educacionais.</p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3 text-gray-300"><span className="text-[#10B981] font-bold">✓</span> Coleta automatizada via MQTT/Bluetooth</li>
              <li className="flex items-start gap-3 text-gray-300"><span className="text-[#10B981] font-bold">✓</span> Sensores de temperatura reais (DS18B20)</li>
              <li className="flex items-start gap-3 text-gray-300"><span className="text-[#10B981] font-bold">✓</span> Sonda de pH digital calibrada</li>
              <li className="flex items-start gap-3 text-gray-300"><span className="text-[#10B981] font-bold">✓</span> Gráficos gerados em real-time no browser</li>
              <li className="flex items-start gap-3 text-gray-300"><span className="text-[#10B981] font-bold">✓</span> Alertas instantâneos de variação de entalpia</li>
            </ul>
            <div className="pt-6 border-t border-white/10 text-sm text-gray-500 font-medium">
              Ideal para: Escolas com laboratório Maker/Robótica.
            </div>
          </div>

          {/* VS Divider */}
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#10B981] text-white font-black text-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] z-10 lg:rotate-0 rotate-90 shrink-0">
            VS
          </div>

          {/* Version B */}
          <div className="flex-1 w-full max-w-lg p-10 lg:p-12 relative rounded-3xl bg-gray-900/60 backdrop-blur-xl border border-[#10B981]/40 shadow-[0_10px_30px_rgba(16,185,129,0.1)] hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute -top-4 left-8 bg-[#10B981]/10 px-6 py-1.5 rounded-full font-bold text-sm text-[#10B981] border border-[#10B981]">
              Low-Cost
            </div>
            <h3 className="text-3xl font-bold mb-2 text-white">Versão B: Sensibilizada</h3>
            <p className="text-gray-400 mb-8 min-h-[48px]">Foco na observação empírica qualitativa e quantitativa básica.</p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3 text-gray-300"><span className="text-[#10B981] font-bold">✓</span> Inserção manual de dados via UI mobile</li>
              <li className="flex items-start gap-3 text-gray-300"><span className="text-[#10B981] font-bold">✓</span> Medição via termômetros de mercúrio/álcool</li>
              <li className="flex items-start gap-3 text-gray-300"><span className="text-[#10B981] font-bold">✓</span> Auditoria visual via Papel de Tornassol</li>
              <li className="flex items-start gap-3 text-gray-300"><span className="text-[#10B981] font-bold">✓</span> Escalas de viscosidade ("Trace") gamificadas</li>
              <li className="flex items-start gap-3 text-gray-300"><span className="text-[#10B981] font-bold">✓</span> Upload de evidências fotográficas</li>
            </ul>
            <div className="pt-6 border-t border-white/10 text-sm text-gray-500 font-medium">
              Ideal para: Salas de aula comuns e baixo orçamento.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Versions;
