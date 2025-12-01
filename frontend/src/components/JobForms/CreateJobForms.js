// frontend/src/components/CreateJobForms/CreateJobForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateJobForms.css";

const CreateJobForm = ({ companyData, onBackToProfile }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre_empresa: companyData?.company_name || "",
    ubicacion: "",
    Giro: companyData?.industry || "",
    Aporte_social: "",
    Tipo_vacante: "",
    Que_ofrecen: "",
    Rango_salarial: "",
    Prestaciones: "",
    Documentos: "",
    Experiencia: "",
    Idiomas: "",
    Nivel_estudios: "",
    Habilidades_obligatorias: "",
    Habilidades_deseables: "",
    Turno: "",
    Horario: "",
    Dias_laborales: "",
    Modalidad: "",
    Actividades_puesto: "",
    Actividades_principales: "",
    Actividades_secundarias: "",
    comentarios: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      ...formData,
      id: Date.now().toString(),
      fecha_creacion: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("companyJobs") || "[]");
    localStorage.setItem("companyJobs", JSON.stringify([...existing, newJob]));

    alert("¡Vacante creada exitosamente!");

    // 🚀 Redirigir a las JobCards
    navigate("/jobs");
  };

  return (
    <div className="create-job-container">
      <div className="create-job-header">
        <button className="back-btn" onClick={onBackToProfile}>
          ← Volver al Perfil
        </button>
        <h2>Crear Nueva Vacante</h2>
        <p>Completa la información para publicar una nueva vacante</p>
      </div>

      <form onSubmit={handleSubmit} className="create-job-form">
        {/* ====================== */}
        {/*     EMPRESA           */}
        {/* ====================== */}
        <div className="form-seccion">
          <h3 className="seccion-titulo">Información de la Empresa</h3>

          <div className="campo-grupo">
            <label>Nombre de la Empresa *</label>
            <input
              type="text"
              name="nombre_empresa"
              value={formData.nombre_empresa}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo-grupo">
            <label>Ubicación *</label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo-grupo">
            <label>Giro *</label>
            <input
              type="text"
              name="Giro"
              value={formData.Giro}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ====================== */}
        {/*    VACANTE            */}
        {/* ====================== */}
        <div className="form-seccion">
          <h3 className="seccion-titulo">Detalles de la Vacante</h3>

          <div className="campo-grupo">
            <label>Tipo de Vacante *</label>
            <select
              name="Tipo_vacante"
              value={formData.Tipo_vacante}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar...</option>
              <option value="Operativa">Operativa</option>
              <option value="Administrativa">Administrativa</option>
              <option value="Directiva">Directiva</option>
              <option value="Técnica">Técnica</option>
            </select>
          </div>

          <div className="campo-grupo">
            <label>Rango Salarial *</label>
            <input
              type="text"
              name="Rango_salarial"
              value={formData.Rango_salarial}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ====================== */}
        {/*   REQUISITOS          */}
        {/* ====================== */}
        <div className="form-seccion">
          <h3 className="seccion-titulo">Requisitos</h3>

          <div className="campo-grupo">
            <label>Experiencia</label>
            <select
              name="Experiencia"
              value={formData.Experiencia}
              onChange={handleChange}
            >
              <option value="">Seleccionar...</option>
              <option value="Sin experiencia">Sin experiencia</option>
              <option value="6 meses - 1 año">6 meses - 1 año</option>
              <option value="1 - 3 años">1 - 3 años</option>
              <option value="3+ años">3+ años</option>
            </select>
          </div>

          <div className="campo-grupo">
            <label>Nivel de estudios</label>
            <select
              name="Nivel_estudios"
              value={formData.Nivel_estudios}
              onChange={handleChange}
            >
              <option value="">Seleccionar...</option>
              <option value="Secundaria">Secundaria</option>
              <option value="Preparatoria">Preparatoria</option>
              <option value="Técnico">Técnico</option>
              <option value="Licenciatura">Licenciatura</option>
            </select>
          </div>
        </div>

        {/* ====================== */}
        {/*   HORARIO             */}
        {/* ====================== */}
        <div className="form-seccion">
          <h3 className="seccion-titulo">Horario y Modalidad</h3>

          <div className="campo-grupo">
            <label>Turno</label>
            <select
              name="Turno"
              value={formData.Turno}
              onChange={handleChange}
            >
              <option value="">Seleccionar...</option>
              <option value="Matutino">Matutino</option>
              <option value="Vespertino">Vespertino</option>
              <option value="Mixto">Mixto</option>
            </select>
          </div>

          <div className="campo-grupo">
            <label>Días Laborales</label>
            <input
              type="text"
              name="Dias_laborales"
              value={formData.Dias_laborales}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ====================== */}
        {/*  BOTONES              */}
        {/* ====================== */}
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            📄 Publicar Vacante
          </button>

          <button type="button" className="btn-cancel" onClick={onBackToProfile}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;
