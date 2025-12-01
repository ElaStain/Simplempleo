import React, { useState } from 'react';
import './CreateJobForms.css';

const CreateJobForm = ({ onBackToProfile, companyData }) => {
  const [formData, setFormData] = useState({
    nombre_empresa: companyData?.company_name || '',
    ubicacion: '',
    Giro: companyData?.industry || '',
    Aporte_social: '',
    Tipo_vacante: '',
    Que_ofrecen: '',
    Rango_salarial: '',
    Prestaciones: '',
    Documentos: '',
    Experiencia: '',
    Idiomas: '',
    Nivel_estudios: '',
    Habilidades_obligatorias: '',
    Habilidades_deseables: '',
    Turno: '',
    Horario: '',
    Dias_laborales: '',
    Modalidad: '',
    Actividades_puesto: '',
    Actividades_principales: '',
    Actividades_secundarias: '',
    comentarios: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Vacante creada:', formData);
    
    // Guardar en localStorage (temporal)
    const existingJobs = JSON.parse(localStorage.getItem('companyJobs') || '[]');
    const newJob = {
      ...formData,
      id: Date.now().toString(),
      fecha_creacion: new Date().toISOString()
    };
    localStorage.setItem('companyJobs', JSON.stringify([...existingJobs, newJob]));
    
    alert('¡Vacante creada exitosamente!');
    onBackToProfile();
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
        {/* Información de la Empresa */}
        <div className="form-seccion">
          <h3 className="seccion-titulo">Información de la Empresa</h3>
          
          <div className="campo-grupo">
            <label htmlFor="nombre_empresa">Nombre de la Empresa *</label>
            <input
              type="text"
              id="nombre_empresa"
              name="nombre_empresa"
              value={formData.nombre_empresa}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="ubicacion">Ubicación *</label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="Giro">Giro de la Empresa *</label>
            <input
              type="text"
              id="Giro"
              name="Giro"
              value={formData.Giro}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="Aporte_social">Aporte Social</label>
            <input
              type="text"
              id="Aporte_social"
              name="Aporte_social"
              value={formData.Aporte_social}
              onChange={handleChange}
              placeholder="Ej: Innovación tecnológica, Responsabilidad social, etc."
            />
          </div>
        </div>

        {/* Detalles de la Vacante */}
        <div className="form-seccion">
          <h3 className="seccion-titulo">Detalles de la Vacante</h3>
          
          <div className="campo-grupo">
            <label htmlFor="Tipo_vacante">Tipo de Vacante *</label>
            <select
              id="Tipo_vacante"
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
            <label htmlFor="Rango_salarial">Rango Salarial *</label>
            <input
              type="text"
              id="Rango_salarial"
              name="Rango_salarial"
              value={formData.Rango_salarial}
              onChange={handleChange}
              placeholder="Ej: $30 - $45/h"
              required
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="Que_ofrecen">¿Qué ofrecen?</label>
            <input
              type="text"
              id="Que_ofrecen"
              name="Que_ofrecen"
              value={formData.Que_ofrecen}
              onChange={handleChange}
              placeholder="Ej: Software y equipo tecnológico"
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="Prestaciones">Prestaciones</label>
            <input
              type="text"
              id="Prestaciones"
              name="Prestaciones"
              value={formData.Prestaciones}
              onChange={handleChange}
              placeholder="Ej: Seguro de vida, SGMM, etc."
            />
          </div>
        </div>

        {/* Requisitos */}
        <div className="form-seccion">
          <h3 className="seccion-titulo">Requisitos</h3>
          
          <div className="campo-grupo">
            <label htmlFor="Experiencia">Experiencia Requerida</label>
            <select
              id="Experiencia"
              name="Experiencia"
              value={formData.Experiencia}
              onChange={handleChange}
            >
              <option value="">Seleccionar...</option>
              <option value="Sin experiencia">Sin experiencia</option>
              <option value="Menor a 6 meses">Menor a 6 meses</option>
              <option value="6 meses - 1 año">6 meses - 1 año</option>
              <option value="1 - 3 años">1 - 3 años</option>
              <option value="3+ años">3+ años</option>
            </select>
          </div>

          <div className="campo-grupo">
            <label htmlFor="Nivel_estudios">Nivel Mínimo de Estudios</label>
            <select
              id="Nivel_estudios"
              name="Nivel_estudios"
              value={formData.Nivel_estudios}
              onChange={handleChange}
            >
              <option value="">Seleccionar...</option>
              <option value="Secundaria">Secundaria</option>
              <option value="Preparatoria">Preparatoria</option>
              <option value="Técnico">Técnico</option>
              <option value="Licenciatura">Licenciatura</option>
              <option value="Maestría">Maestría</option>
            </select>
          </div>

          <div className="campo-grupo">
            <label htmlFor="Idiomas">Idiomas</label>
            <input
              type="text"
              id="Idiomas"
              name="Idiomas"
              value={formData.Idiomas}
              onChange={handleChange}
              placeholder="Ej: Español, Inglés intermedio"
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="Habilidades_obligatorias">Habilidades Obligatorias</label>
            <textarea
              id="Habilidades_obligatorias"
              name="Habilidades_obligatorias"
              value={formData.Habilidades_obligatorias}
              onChange={handleChange}
              rows="3"
              placeholder="Lista de habilidades requeridas"
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="Habilidades_deseables">Habilidades Deseables</label>
            <textarea
              id="Habilidades_deseables"
              name="Habilidades_deseables"
              value={formData.Habilidades_deseables}
              onChange={handleChange}
              rows="3"
              placeholder="Habilidades que serían un plus"
            />
          </div>
        </div>

        {/* Horario y Modalidad */}
        <div className="form-seccion">
          <h3 className="seccion-titulo">Horario y Modalidad</h3>
          
          <div className="campo-grupo">
            <label htmlFor="Turno">Turno</label>
            <select
              id="Turno"
              name="Turno"
              value={formData.Turno}
              onChange={handleChange}
            >
              <option value="">Seleccionar...</option>
              <option value="Matutino">Matutino</option>
              <option value="Vespertino">Vespertino</option>
              <option value="Nocturno">Nocturno</option>
              <option value="Mixto">Mixto</option>
            </select>
          </div>

          <div className="campo-grupo">
            <label htmlFor="Horario">Horario</label>
            <input
              type="text"
              id="Horario"
              name="Horario"
              value={formData.Horario}
              onChange={handleChange}
              placeholder="Ej: 8h, 9:00 - 18:00"
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="Dias_laborales">Días Laborales</label>
            <input
              type="text"
              id="Dias_laborales"
              name="Dias_laborales"
              value={formData.Dias_laborales}
              onChange={handleChange}
              placeholder="Ej: Lunes a Viernes"
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="Modalidad">Modalidad</label>
            <select
              id="Modalidad"
              name="Modalidad"
              value={formData.Modalidad}
              onChange={handleChange}
            >
              <option value="">Seleccionar...</option>
              <option value="Presencial">Presencial</option>
              <option value="Remoto">Remoto</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>
        </div>

        {/* Actividades */}
        <div className="form-seccion">
          <h3 className="seccion-titulo">Actividades del Puesto</h3>
          
          <div className="campo-grupo">
            <label htmlFor="Actividades_puesto">Actividades Generales</label>
            <textarea
              id="Actividades_puesto"
              name="Actividades_puesto"
              value={formData.Actividades_puesto}
              onChange={handleChange}
              rows="3"
              placeholder="Descripción general del puesto"
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="Actividades_principales">Actividades Principales</label>
            <textarea
              id="Actividades_principales"
              name="Actividades_principales"
              value={formData.Actividades_principales}
              onChange={handleChange}
              rows="3"
              placeholder="Tareas principales del puesto"
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="Actividades_secundarias">Actividades Secundarias</label>
            <textarea
              id="Actividades_secundarias"
              name="Actividades_secundarias"
              value={formData.Actividades_secundarias}
              onChange={handleChange}
              rows="3"
              placeholder="Tareas adicionales o de apoyo"
            />
          </div>
        </div>

        {/* Información Adicional */}
        <div className="form-seccion">
          <h3 className="seccion-titulo">Información Adicional</h3>
          
          <div className="campo-grupo">
            <label htmlFor="Documentos">Documentos Requeridos</label>
            <input
              type="text"
              id="Documentos"
              name="Documentos"
              value={formData.Documentos}
              onChange={handleChange}
              placeholder="Ej: CV, Certificado médico, INE"
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="comentarios">Comentarios Adicionales</label>
            <textarea
              id="comentarios"
              name="comentarios"
              value={formData.comentarios}
              onChange={handleChange}
              rows="4"
              placeholder="Información adicional, beneficios, oportunidades de crecimiento, etc."
            />
          </div>
        </div>

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