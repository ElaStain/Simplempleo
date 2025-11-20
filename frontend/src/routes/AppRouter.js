import { Routes, Route } from "react-router-dom";
import WelcomePage from "../components/WelcomePage/WelcomePage.js";
import CandidateRegister from "../components/CandidateRegister/CandidateRegister.js";
import CompaniesRegister from "../components/CompaniesRegister/CompaniesRegister.js"; 

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/registro-candidato" element={<CandidateRegister />} />
      <Route path="/registro-empresa" element={<CompaniesRegister />} /> 
    </Routes>
  );
}