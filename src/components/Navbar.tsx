import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <img src="/vite.svg" alt="EcoSabon Logo" className="logo-icon" />
          <span className="logo-text">EcoSabon</span>
        </div>
        <ul className="navbar-menu">
          <li><a href="#about">Sobre o Projeto</a></li>
          <li><a href="#journey">Jornada</a></li>
          <li><a href="#versions">Versões</a></li>
          <li><a href="#stack">Stack</a></li>
        </ul>
        <div className="navbar-actions">
          <button className="btn btn-outline">Area do Professor</button>
          <button className="btn btn-primary">Acessar Laboratório</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
