import React, { useState, useEffect, useRef } from "react";
import "./ResumeForms.css";

export default function ResumeForms({ candidateData, onBack }) {
  const navbarRef = useRef(null);
  const [topMargin, setTopMargin] = useState(0);
  const [formData, setFormData] = useState({
    name: candidateData?.name || "",
    alcaldia: candidateData?.alcaldía || "",
    job_role: candidateData?.job_role || "",
    skills: candidateData?.skills.join(", ") || "",
    experience_summary: candidateData?.experience_summary || "",
    Giro: candidateData?.Giro || "",
    Tipo_vacante: candidateData?.["Tipo de vacante"] || "",
    Rango_salarial: candidateData?.["Rango salarial"] || "",
    Prestaciones: candidateData?.Prestaciones || "",
    Documentos: candidateData?.Documentos || "",
    Experiencia: candidateData?.Experiencia || "",
    Idiomas: candidateData?.Idiomas || "",
    Nivel_estudios: candidateData?.["Nivel mínimo de estudios"] || "",
    Turno: candidateData?.Turno || "",
    Horario: candidateData?.Horario || "",
    Dias_laborales: candidateData?.["Días laborales"] || "",
    Modalidad: candidateData?.Modalidad || "",
    Actividades_puesto: candidateData?.["Actividades del puesto"] || "",
    Actividades_principales: candidateData?.["Actividades principales"] || "",
    Actividades_secundarias: candidateData?.["Actividades secundarias"] || "",
    Habilidades_blandas: candidateData?.["Habilidades blandas"] || "",
    Habilidades_duras: candidateData?.["Habilidades duras"] || ""
  });

  useEffect(() => {
    const navbarHeight = navbarRef.current?.offsetHeight || 0;
    setTopMargin(navbarHeight + 20);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("CV enviado:", formData);
    alert("✅ CV actualizado exitosamente!");
  };

  return (
    <>
      <div ref={navbarRef} style={{ display: "none" }}></div>

      <div className="resume-form-container" style={{ marginTop: `${topMargin}px` }}>
        <h2>Formulario de CV</h2>
        <form onSubmit={handleSubmit} className="resume-form">
          <label>Nombre completo</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />

          <label>Alcaldía</label>
          <input type="text" name="alcaldia" value={formData.alcaldia} onChange={handleChange} />

          <label>Puesto deseado</label>
          <input type="text" name="job_role" value={formData.job_role} onChange={handleChange} />

          <label>Habilidades (separadas por coma)</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} />

          <label>Resumen de experiencia</label>
          <textarea name="experience_summary" value={formData.experience_summary} onChange={handleChange} rows="3" />

          <label>Giro</label>
          <input type="text" name="Giro" value={formData.Giro} onChange={handleChange} />

          <label>Tipo de vacante</label>
          <input type="text" name="Tipo_vacante" value={formData.Tipo_vacante} onChange={handleChange} />

          <label>Rango salarial</label>
          <input type="text" name="Rango_salarial" value={formData.Rango_salarial} onChange={handleChange} />

          <label>Prestaciones</label>
          <input type="text" name="Prestaciones" value={formData.Prestaciones} onChange={handleChange} />

          <label>Documentos requeridos</label>
          <input type="text" name="Documentos" value={formData.Documentos} onChange={handleChange} />

          <label>Experiencia</label>
          <input type="text" name="Experiencia" value={formData.Experiencia} onChange={handleChange} />

          <label>Idiomas</label>
          <input type="text" name="Idiomas" value={formData.Idiomas} onChange={handleChange} />

          <label>Nivel mínimo de estudios</label>
          <input type="text" name="Nivel_estudios" value={formData.Nivel_estudios} onChange={handleChange} />

          <label>Turno</label>
          <input type="text" name="Turno" value={formData.Turno} onChange={handleChange} />

          <label>Horario</label>
          <input type="text" name="Horario" value={formData.Horario} onChange={handleChange} />

          <label>Días laborales</label>
          <input type="text" name="Dias_laborales" value={formData.Dias_laborales} onChange={handleChange} />

          <label>Modalidad</label>
          <input type="text" name="Modalidad" value={formData.Modalidad} onChange={handleChange} />

          <label>Actividades del puesto</label>
          <textarea name="Actividades_puesto" value={formData.Actividades_puesto} onChange={handleChange} rows="2" />

          <label>Actividades principales</label>
          <textarea name="Actividades_principales" value={formData.Actividades_principales} onChange={handleChange} rows="2" />

          <label>Actividades secundarias</label>
          <textarea name="Actividades_secundarias" value={formData.Actividades_secundarias} onChange={handleChange} rows="2" />

          <label>Habilidades blandas</label>
          <input type="text" name="Habilidades_blandas" value={formData.Habilidades_blandas} onChange={handleChange} />

          <label>Habilidades duras</label>
          <input type="text" name="Habilidades_duras" value={formData.Habilidades_duras} onChange={handleChange} />

          <div className="form-actions">
            <button type="submit">Guardar CV</button>
            {onBack && <button type="button" onClick={onBack}>Volver</button>}
          </div>
        </form>
      </div>
    </>
  );
}
