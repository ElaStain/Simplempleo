import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ResumeForms.css";

export default function ResumeForms() {
  const navigate = useNavigate();

  // Datos de ejemplo o desde localStorage si existen
  const storedData = JSON.parse(localStorage.getItem("resumeData")) || {
    name: "",
    alcaldia: "",
    job_role: "",
    skills: "",
    experience_summary: "",
  };

  const [formData, setFormData] = useState(storedData);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("CV listo para enviar:", formData);
    alert("¡CV guardado!");
    navigate("/candidate-profile"); // Regresa al perfil del candidato
  };

  return (
    <div className="resume-container">
      <h2>Formulario de CV</h2>
      <form onSubmit={handleSubmit} className="resume-form">
        <label>Nombre completo</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej. María López"
        />

        <label>Alcaldía</label>
        <input
          type="text"
          name="alcaldia"
          value={formData.alcaldia}
          onChange={handleChange}
          placeholder="Ej. Iztapalapa"
        />

        <label>Puesto deseado</label>
        <input
          type="text"
          name="job_role"
          value={formData.job_role}
          onChange={handleChange}
          placeholder="Ej. Cajera"
        />

        <label>Habilidades (separadas por comas)</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Ej. Atención al cliente, Caja"
        />

        <label>Resumen de experiencia</label>
        <textarea
          name="experience_summary"
          value={formData.experience_summary}
          onChange={handleChange}
          placeholder="Ej. 2 años como cajera en tienda de conveniencia."
        />

        <div className="buttons-container">
          <button type="submit" className="submit-btn">
            Guardar CV
          </button>
          <button
            type="button"
            className="view-jobs-btn"
            onClick={() => navigate("/jobs")}
          >
            Ver vacantes
          </button>
        </div>
      </form>
    </div>
  );
}
