import React from 'react';
import { Link } from 'react-router-dom';

const Cartilha: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-['Inter'] flex flex-col items-center">
      <nav className="w-full border-b border-white/10 bg-gray-900/50 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-2 font-bold transition">
            <span>←</span> Voltar para Home
          </Link>
          <div className="text-sm font-semibold tracking-wide text-[#F59E0B] uppercase">Documento Oficial</div>
        </div>
      </nav>

      <main className="w-full max-w-4xl px-6 py-12 flex-1">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-['Outfit'] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#3B82F6]">
            Cartilha do Aluno: Regras do Jogo
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            O EcoSabon não é um sistema de "receitas prontas". É uma jornada científica restrita. 
            Você só fará sabão manipulando soda química se provar matematicamente que sabe o que está fazendo.
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <section className="bg-gray-900/60 p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4 text-[#3B82F6] flex items-center gap-3">
              <span className="text-3xl">🧩</span> 1. A Estrutura de Cadeados (Locks)
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              O modelo MTP da nossa plataforma bloqueia o avanço aleatório. A plataforma tem 9 Missões. A Missão 2 só abrirá se o Diário de Bordo da Missão 1 for entregue, 
              evitando que acidentes ocorram no laboratório pela pressa ou pular etapas.
            </p>
            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li><strong className="text-white">XP (Experiência):</strong> Você ganha pontos formativos a cada etapa.</li>
                <li><strong className="text-white">Litros Salvos:</strong> A métrica primária é ambiental. Cada litro de óleo recolhido destrava 25.000 Litros de Água preservados no seu Dashboard.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-gray-900/60 p-8 rounded-3xl border border-[#10B981]/30">
            <h2 className="text-2xl font-bold mb-4 text-[#10B981] flex items-center gap-3">
              <span className="text-3xl">⚖️</span> 2. Motor Estequiométrico (Seus Inimigos)
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              O coração tecnológico desta plataforma é o *SaponificationEngine*. Nas Missões 3, 5 e 8, nosso algoritmo não aceitará fotos. Ele exigirá cálculos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-900/10 p-4 border border-red-500/30 rounded-xl">
                <h4 className="text-red-400 font-bold mb-2">Perigo 1: Excesso Base</h4>
                <p className="text-sm text-gray-300">Se você errar a "Regra de 3" na Missão 3 e colocar mais NaOH do que a gordura consegue reagir, o sabão corroerá a pele. Nossa margem de *superfatting* de 5% bloqueará o sistema antes de você tentar misturar na bancada.</p>
              </div>
              <div className="bg-blue-900/10 p-4 border border-blue-500/30 rounded-xl">
                <h4 className="text-blue-400 font-bold mb-2">Perigo 2: Reação Fria</h4>
                <p className="text-sm text-gray-300">A Missão 5 exige que você comprove que a temperatura da Mistura Óleo+Base subiu. Trata-se de uma Reação Exotérmica. Se o termômetro não marcar um delta maior que +2°C, a reação de hidrólise falhou.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-gray-900/60 p-8 rounded-3xl border border-[#F59E0B]/30">
            <h2 className="text-2xl font-bold mb-4 text-[#F59E0B] flex items-center gap-3">
              <span className="text-3xl">📸</span> 3. Diário de Bordo Visual
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Na Metodologia Científica não existe evidência baseada em "confia em mim, professor". 
              Você deverá tirar fotos com a câmera do celular de suas luvas, balanças, cor do "Trace" (ponto do sabão) e da tira de Ph (Missão 8). 
              A foto é injetada na plataforma como comprovante inalterável da sua Estação.
            </p>
          </section>
        </div>

        <div className="mt-16 text-center">
          <Link to="/dashboard" className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] hover:opacity-90 text-white px-10 py-5 rounded-full font-bold text-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] inline-block">
            Tudo Entendido. Ir para o Laboratório
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Cartilha;
