// frontend/src/components/Navbar/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="menu-container">
          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
          </button>
          {menuOpen && (
            <div className="dropdown-menu">
              <Link to="/about" onClick={() => setMenuOpen(false)}>Sobre Nosotros</Link>
              <a href="#Para inversores">Para Inversores</a>
              <a href="#vacancies">Vacantes</a>
              <div className="theme-toggle">
                <span>Modo {darkMode ? 'Claro' : 'Oscuro'}</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={darkMode} 
                    onChange={toggleDarkMode} 
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="logo">
          <span>Simplempleo</span>
        </div>
      </div>
      
      <div className="navbar-right">
        <a href="#home">Inicio</a>
        <a href="#company">Empresa</a>
        <a href="#profile">Perfil</a>
        <button className="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;