import React from 'react';
import './Impact.css';

const Impact: React.FC = () => {
  return (
    <section className="impact" id="impact">
      <div className="impact-overlay"></div>
      <div className="container text-center impact-content">
        <h2 className="impact-title">A Matemática da Sustentabilidade</h2>
        <p className="impact-subtitle">
          Cada grama de óleo jogada no ralo tem um preço. O EcoSabon ensina os alunos a reverterem essa dívida ambiental.
        </p>
        
        <div className="impact-calc glass-card">
          <div className="calc-item">
            <span className="emoji">🛢️</span>
            <h4>1 Litro de Óleo Usado</h4>
          </div>
          <div className="calc-operator">=</div>
          <div className="calc-item highlight">
            <span className="emoji">💧</span>
            <h4>25.000L de Água Salva</h4>
          </div>
        </div>

        <button className="btn btn-primary btn-lg mt-4">Junte-se à Inciativa</button>
      </div>
    </section>
  );
};

export default Impact;
