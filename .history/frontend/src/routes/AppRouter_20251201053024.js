import { Routes, Route } from "react-router-dom";
import WelcomePage from "../components/WelcomePage/WelcomePage.js";
import CandidateRegister from "../components/CandidateRegister/CandidateRegister.js";
import CompaniesRegister from "../components/CompaniesRegister/CompaniesRegister.js"; 
import AboutUs from '../components/AboutUs/AboutUs';
import CreateJobForm from '../components/JobForms/CreateJobForms';
import JobCards from "../components/JobCards/JobCards.jsx";
import CandidateProfile from "../components/CandidateProfile/CandidateProfile.js";
import ResumeForms from "../components/ResumeForms/ResumeForms.js";

export default function AppRouter({ onRegisterSuccess }) {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/registro-candidato" element={<CandidateRegister />} />
      <Route 
        path="/registro-empresa" 
        element={<CompaniesRegister onRegisterSuccess={onRegisterSuccess} />}
      />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/create-job" element={<CreateJobForm />} />
      <Route path="/jobs" element={<JobCards />} />
      <Route path="/candidate-profile" element={<CandidateProfile />} />
    </Routes>
  );
}
