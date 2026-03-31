import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0f1a] border-t border-white/10 pt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        
        {/* Brand */}
        <div className="md:col-span-6">
          <div className="flex items-center gap-3 font-extrabold text-2xl mb-4 text-white">
            <img src="/vite.svg" alt="EcoSabon Logo" className="w-8 h-8 grayscale brightness-200" />
            <span className="font-['Outfit']">EcoSabon</span>
          </div>
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
            Desenvolvido com MTP e SDD para a nova geração de currículos escolares de Ciências da Natureza. 
            Educação gamificada unindo química orgânica e engenharia de precisão.
          </p>
        </div>
        
        {/* Links 1 */}
        <div className="md:col-span-3">
          <h4 className="text-white font-bold text-lg mb-6">Plataforma</h4>
          <ul className="space-y-4">
            <li><a href="#journey" className="text-gray-400 hover:text-[#10B981] text-sm transition-colors">Jornada do Aluno</a></li>
            <li><a href="#versions" className="text-gray-400 hover:text-[#10B981] text-sm transition-colors">Versão Sensores</a></li>
            <li><a href="#about" className="text-gray-400 hover:text-[#10B981] text-sm transition-colors">Impacto Ambiental</a></li>
            <li><a href="#stack" className="text-gray-400 hover:text-[#10B981] text-sm transition-colors">Engenharia Core</a></li>
          </ul>
        </div>
        
        {/* Links 2 */}
        <div className="md:col-span-3">
          <h4 className="text-white font-bold text-lg mb-6">Documentação</h4>
          <ul className="space-y-4">
            <li><button className="text-gray-400 hover:text-[#10B981] text-sm transition-colors cursor-pointer text-left">Manifesto SDD (Core)</button></li>
            <li><button className="text-gray-400 hover:text-[#10B981] text-sm transition-colors cursor-pointer text-left">API Docs (Telemetria IoT)</button></li>
            <li><button className="text-gray-400 hover:text-[#10B981] text-sm transition-colors cursor-pointer text-left">Clean Architecture Repo</button></li>
          </ul>
        </div>

      </div>
      
      <div className="border-t border-white/10 py-8 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} EcoSabon. Desenvolvido por <span className="text-gray-300 font-semibold">Leonardo Maximino Bernardo</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
