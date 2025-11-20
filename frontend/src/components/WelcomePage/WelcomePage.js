// frontend/src/components/pages/WelcomePage.js
import React, { useState, useEffect } from 'react';
import './WelcomePage.css';
import { Link } from "react-router-dom";


const WelcomePage = ({ darkMode, toggleDarkMode }) => {
  // ✅ CONEXIÓN SOLO EN CONSOLA
  useEffect(() => {
    console.log('🔄 Conectando con backend...');
    
    fetch('http://localhost:8000/api/')
      .then(response => response.json())
      .then(data => {
        console.log('✅ Backend conectado:', data);
      })
      .catch(error => {
        console.error('❌ Error conectando al backend:', error);
      });
  }, []);

  return (
    <div className="app dark-mode">
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
                <Link to="/registro-candidato">
                  <button className="btn btn-candidate">
                      Estoy buscando trabajo
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WelcomePage;