import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/vite.svg" alt="EcoSabon Logo" className="logo-icon grayscale" />
            <span className="logo-text">EcoSabon</span>
          </div>
          <p className="footer-desc">
            Desenvolvido com MTP e SDD para a nova geração de currículos escolares de Ciências da Natureza.
          </p>
        </div>
        
        <div className="footer-links">
          <h4>Plataforma</h4>
          <ul>
            <li><a href="#journey">Jornada do Aluno</a></li>
            <li><a href="#versions">Versão Sensores</a></li>
            <li><a href="#about">Impacto Ambiental</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4>Documentação</h4>
          <ul>
            <li><a href="#">Manifesto SDD</a></li>
            <li><a href="#">API Docs (IoT)</a></li>
            <li><a href="#">Clean Architecture</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <p>&copy; {new Date().getFullYear()} EcoSabon. Desenvolvido para transformar educação.</p>
      </div>
    </footer>
  );
};

export default Footer;
