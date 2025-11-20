import { Routes, Route } from "react-router-dom";
import WelcomePage from "../components/WelcomePage/WelcomePage.js";
import CandidateRegister from "../components/CandidateRegister/CandidateRegister.js";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/registro-candidato" element={<CandidateRegister />} />
    </Routes>
  );
}