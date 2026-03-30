import React from 'react';
import './Versions.css';

const Versions: React.FC = () => {
  return (
    <section className="versions" id="versions">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Inclusão e <span className="gradient-text">Adaptação</span></h2>
          <p className="section-subtitle">
            Acreditamos que a ciência deve ser acessível a todas as realidades escolares.
            O EcoSabon traz a garantia do mesmo rigor pedagógico, com ou sem hardware IoT.
          </p>
        </div>

        <div className="versions-grid">
          {/* Version A */}
          <div className="version-card glass-card version-a">
            <div className="version-badge">High-Tech</div>
            <h3>Versão A: Sensores IoT</h3>
            <p className="version-desc">Integração nativa com microcontroladores educacionais.</p>
            <ul className="version-features">
              <li><span className="check">✓</span> Coleta automatizada via MQTT/Bluetooth</li>
              <li><span className="check">✓</span> Sensores de temperatura reais ($DS18B20$)</li>
              <li><span className="check">✓</span> Sonda de pH digital calibrada</li>
              <li><span className="check">✓</span> Gráficos gerados em *real-time* no browser</li>
              <li><span className="check">✓</span> Alertas instantâneos de variação de entalpia</li>
            </ul>
            <div className="version-target">Ideial para: Escolas com laboratório Maker/Robótica.</div>
          </div>

          {/* VS Divider */}
          <div className="vs-divider">
            <span>VS</span>
          </div>

          {/* Version B */}
          <div className="version-card glass-card version-b">
            <div className="version-badge highlight">Low-Cost</div>
            <h3>Versão B: Sensibilizada</h3>
            <p className="version-desc">Foco na observação empírica qualitativa e quantitativa básica.</p>
            <ul className="version-features">
              <li><span className="check">✓</span> Inserção manual de dados via UI mobile</li>
              <li><span className="check">✓</span> Medição via termômetros de mercúrio/álcool</li>
              <li><span className="check">✓</span> Auditoria visual via Papel de Tornassol colorido</li>
              <li><span className="check">✓</span> Escalas de viscosidade ("Ponto de Trace") gamificadas</li>
              <li><span className="check">✓</span> Upload de evidências fotográficas validadas pelo docente</li>
            </ul>
            <div className="version-target">Ideial para: Salas de aula comuns padrão e baixo orçamento.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Versions;
