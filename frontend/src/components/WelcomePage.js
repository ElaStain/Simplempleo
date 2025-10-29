import React, { useState } from 'react';
import './WelcomePage.css';

const WelcomePage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="app dark-mode">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="menu-container">
            <button className="menu-toggle" onClick={toggleMenu}>
              <span></span>
              <span></span>
            </button>
            {menuOpen && (
              <div className="dropdown-menu">
                <a href="#about">Sobre Nosotros</a>
                <a href="#blog">Blog</a>
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
            <span>Logo</span>
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

      {/* Main Content */}
      <main className="main-content">
        <section className="welcome-section">
          <div className="welcome-container">
            <div className="welcome-image">
              <div className="placeholder-image">
                <span>Imagen</span>
              </div>
            </div>
            <div className="welcome-text">
              <h1>Únete a nuestra plataforma</h1>
              <p>Conectamos talento con oportunidades. Ya sea que busques trabajo o necesites encontrar al candidato perfecto, estamos aquí para ayudarte.</p>
              <div className="button-container">
                <button className="btn btn-candidate">Soy candidato buscando trabajo</button>
                <button className="btn btn-employer">Soy emprendedor buscando empleados</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 12V13C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13V12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 12V8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.3431 15 8" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                <circle cx="18" cy="6" r="1" fill="currentColor"/>
              </svg>
            </a>
          </div>
          
          <div className="footer-links">
            <a href="#privacy">Aviso de Privacidad</a>
            <a href="#legal">Aviso Legal</a>
            <a href="#terms">Términos y Condiciones</a>
            <a href="mailto:info@empresa.com">info@empresa.com</a>
          </div>
          
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;