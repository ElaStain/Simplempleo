// frontend/src/App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import AppRouter from "./routes/AppRouter.js";
import CompaniesProfile from "./components/CompaniesProfile/CompaniesProfile.js";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState('router');

  const handleRegisterSuccess = () => {
    console.log('✅ handleRegisterSuccess ejecutado en App.js');
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
          <CompaniesProfile onBackToRouter={handleBackToRouter} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;