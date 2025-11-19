// frontend/src/components/layout/Footer/Footer.js
import React from 'react';
import './footer.css';

const Footer = () => {
  return (
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
          <a href="mailto:info@simplempleo.com">info@simplempleo.com</a>
        </div>
        
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Simplempleo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;