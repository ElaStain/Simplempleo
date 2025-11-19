// frontend/src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar.js';
import WelcomePage from './components/WelcomePage/WelcomePage.js';
import Footer from './components/Footer/Footer.js';

import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <WelcomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Footer />
    </div>
  );
}

export default App;