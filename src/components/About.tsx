import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-header text-center">
          <h2 className="section-title">O Problema e a <span className="gradient-text">Solução</span></h2>
          <p className="section-subtitle">
            Entenda por que reciclar o óleo de cozinha nas escolas é urgente e como 
            nossa plataforma torna isso possível através do ensino gamificado.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card glass-card">
            <div className="card-icon error-icon">⚠️</div>
            <h3>O Desastre Silencioso</h3>
            <p>
              Apenas 1 litro de óleo de cozinha usado descartado incorretamente no ralo 
              pode contaminar até 25.000 litros de água potável, prejudicando rios, solos 
              e a infraestrutura de saneamento básico da sua cidade.
            </p>
          </div>
          
          <div className="about-card glass-card highlight-card">
            <div className="card-icon eco-icon">🌱</div>
            <h3>A Solução EcoSabon</h3>
            <p>
              Transformamos escolas em autênticas usinas de reciclagem por meio de aulas de 
              química experimental. Os alunos coletam o óleo na comunidade e o convertem em 
              sabão em barra, guiados por nossa trilha digital passo a passo.
            </p>
          </div>
          
          <div className="about-card glass-card">
            <div className="card-icon science-icon">🧪</div>
            <h3>Rigor Científico</h3>
            <p>
              Não é "apenas uma receita". O sistema cobra cálculos de índice de saponificação, 
              medições de entalpia, e auditoria de pH (com ou sem sensores IoT) para garantir 
              segurança máxima e compreensão teórica da termodinâmica.
            </p>
          </div>
        </div>

        <div className="about-visual-feature">
          <div className="visual-feature-text">
            <h3>Uma Extensão do Laboratório</h3>
            <p>
              Em escolas públicas onde faltam laboratórios físicos equipados, a plataforma 
              atua como substituto metodológico, ensinando o método científico "Hipótese-Teste-Registro", 
              através de uploads fáceis de fotos, diários de bordo e alertas de segurança.
            </p>
          </div>
          <div className="visual-feature-image-wrapper">
             <img src="/assets/lab-illustration.png" alt="Workspace digital de química" className="feature-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
