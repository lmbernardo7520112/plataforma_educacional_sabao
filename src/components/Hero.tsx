import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-background"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">Inovação em Educação STEM</div>
          <h1 className="hero-title">
            Transformando Passivo Ambiental em <span className="gradient-text">Ciência Viva</span>
          </h1>
          <p className="hero-subtitle">
            O laboratório digital e gamificado que orquestra a fabricação real de sabão 
            sustentável usando óleo de cozinha. Interdisciplinar, investigativo e rigoroso.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg">Explorar Jornada</button>
            <button className="btn btn-outline btn-lg">Ler o Manifesto SDD</button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">9</span>
              <span className="stat-label">Missões Gamificadas</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">25k</span>
              <span className="stat-label">Litros de Água/L de Óleo</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">Rigor Pedagógico</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="glass-card hero-image-wrapper">
            <img src="/assets/hero-illustration.png" alt="Laboratório de saponificação" className="hero-image" />
            <div className="floating-badge badge-chemistry">Química e Física</div>
            <div className="floating-badge badge-eco">Sustentabilidade</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
