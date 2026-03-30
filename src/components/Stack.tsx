import React from 'react';
import './Stack.css';

const Stack: React.FC = () => {
  return (
    <section className="stack" id="stack">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Engenharia de <span className="gradient-text">Ponta</span></h2>
          <p className="section-subtitle">
            Desenvolvido sob padrões restritos de Specification Driven Development (SDD) e Clean Architecture, o EcoSabon é robusto, ágil e escalável.
          </p>
        </div>

        <div className="stack-container">
          <div className="stack-circle core">SDD Core</div>
          <div className="orbit orbit-1">
            <div className="tech-node react">React 19</div>
            <div className="tech-node vite">Vite</div>
          </div>
          <div className="orbit orbit-2">
            <div className="tech-node node">Node.js</div>
            <div className="tech-node ts">TypeScript</div>
            <div className="tech-node mongo">MongoDB</div>
          </div>
          <div className="orbit orbit-3">
            <div className="tech-node docker">Docker</div>
            <div className="tech-node ci">CI/CD</div>
          </div>
        </div>

        <div className="stack-features text-center">
          <div className="feature-chip">Modularidade Extrema</div>
          <div className="feature-chip">Design System Custom</div>
          <div className="feature-chip">REST & WebSockets</div>
          <div className="feature-chip">Zero Tailwind (CSS Puro)</div>
          <div className="feature-chip">Conteinerização Padrão</div>
        </div>
      </div>
    </section>
  );
};

export default Stack;
