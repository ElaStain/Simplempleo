// frontend/src/App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import AppRouter from "./routes/AppRouter.js";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState('router'); // 'router' | 'companiesProfile'

  const handleRegisterSuccess = () => {
    setCurrentView('companiesProfile');
  };

  const handleBackToRouter = () => {
    setCurrentView('router');
  };

  return (
    <div className="app light-mode">
      <Navbar />
      <main style={{ flex: 1 }}>
        {currentView === 'router' && (
          <AppRouter onRegisterSuccess={handleRegisterSuccess} />
        )}
        {currentView === 'companiesProfile' && (
          <div>
            {/* Aquí necesitarías importar y usar CompaniesProfile */}
            <button onClick={handleBackToRouter} style={{margin: '20px', padding: '10px'}}>
              ← Volver al Inicio
            </button>
            <div style={{padding: '20px', textAlign: 'center'}}>
              <h2>CompaniesProfile se mostraría aquí</h2>
              <p>Después del registro exitoso</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;