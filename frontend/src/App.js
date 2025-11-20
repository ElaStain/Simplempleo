import React from "react";
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import AppRouter from "./routes/AppRouter.js";
import "./App.css";

function App() {
  return (
    <div className="app light-mode">
      <Navbar />
      <main style={{ flex: 1 }}>
        <AppRouter /> {/* Aquí ya no envuelvas en BrowserRouter */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
