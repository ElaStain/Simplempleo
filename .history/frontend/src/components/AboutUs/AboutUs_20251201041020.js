// components/AboutUs/AboutUs.js
import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Header/Hero Section */}
      <section className="hero-section">
        <h1>Acerca de Nosotros</h1>
        {/* LOGO - Opción A (Recomendada) */}
        <div className="logo-container">
          <img 
            src="frontend/public/images/logo_simplempleo.png"
            alt="Simplempleo Logo" 
            className="company-logo" 
          />
        </div>
        <p>Somos un ecosistema digital que simplifica el crecimiento de micro, pequeñas y medianas empresas mexicanas, a través de una plataforma accesible de reclutamiento.</p>
      </section>

      {/* Misión y Visión */}
      <section className="mission-vision">
        <div className="card">
          <h2>🧭 Nuestra Misión</h2>
          <p>Empoderar a las PyMEs para que superen sus límites de recursos y conocimiento, proporcionándoles las herramientas y conexiones necesarias para crecer competitivamente de forma efectiva.</p>
        </div>
        <div className="card">
          <h2>🎯 Nuestra Visión</h2>
          <p>Ser el ecosistema de referencia en de habla hispana donde cualquier PyME encuentre no solo el talento que necesita, sino todos los recursos para convertirse en una empresa competitiva, innovadora y sostenible.</p>
        </div>
      </section>

      {/* Enlace MOP */}
      <section className="mop-section">
        <h2>📋 Marco Operativo</h2>
        <a href="https://www.canva.com/design/DAG3Vmts7tU/0KVjbfbfgrWp9JfxoZpv_w/view?utm_content=DAG3Vmts7tU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=ha65f3d05f1" target="_blank" rel="noopener noreferrer">
          Ver nuestro Marco Operativo
        </a>
      </section>
    </div>
  );
};

export default AboutUs;