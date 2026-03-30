import React from 'react';
import './Journey.css';

interface Mission {
  id: number;
  title: string;
  theme: string;
  status: 'locked' | 'active' | 'completed';
}

const Journey: React.FC = () => {
  const missions: Mission[] = [
    { id: 1, title: 'O Inimigo Invisível', theme: 'Sustentabilidade', status: 'completed' },
    { id: 2, title: 'Vestindo o Jaleco', theme: 'Segurança', status: 'completed' },
    { id: 3, title: 'A Receita (Cálculos)', theme: 'Estequiometria', status: 'active' },
    { id: 4, title: 'Purificação do Óleo', theme: 'Separação', status: 'locked' },
    { id: 5, title: 'O Despertar (Reactivo)', theme: 'Entalpia', status: 'locked' },
    { id: 6, title: 'A Fusão (Trace)', theme: 'Saponificação', status: 'locked' },
    { id: 7, title: 'Molde e Repouso', theme: 'Cristalização', status: 'locked' },
    { id: 8, title: 'Auditoria de pH', theme: 'Qualidade Base', status: 'locked' },
    { id: 9, title: 'Embaixadores da Água', theme: 'Culminância', status: 'locked' },
  ];

  return (
    <section className="journey" id="journey">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">A Jornada <span className="gradient-text">Gamificada</span></h2>
          <p className="section-subtitle">
            9 missões estritamente encadeadas garantem que nenhuma etapa de segurança 
            seja pulada. A classe só avança quando entrega evidências fotográficas ou numéricas.
          </p>
        </div>

        <div className="timeline">
          {missions.map((mission) => (
            <div key={mission.id} className={`timeline-item ${mission.status}`}>
              <div className="timeline-marker">
                {mission.status === 'completed' ? '✓' : mission.id}
              </div>
              <div className="timeline-content glass-card">
                <span className="mission-theme">{mission.theme}</span>
                <h4>Missão {mission.id}: {mission.title}</h4>
                {mission.status === 'active' && (
                  <button className="btn btn-primary btn-sm mt-3">Continuar</button>
                )}
                {mission.status === 'locked' && (
                  <span className="locked-badge">Bloqueado 🔒</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
