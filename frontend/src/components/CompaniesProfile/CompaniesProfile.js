import React, { useState, useEffect } from "react";
import "./CompaniesProfile.css";

export default function CompaniesProfile({ onBackToRouter }) {
  const [formData, setFormData] = useState({
    company_name: "",
    industry: "",
    contact_email: "",
    address: "",
    website_url: "",
    description: "",
    recruiter_name: "",
    recruiter_position: "",
    recruiter_email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState("profile"); // "profile" | "createJob" | "editJobs"

  // Cargar datos del perfil al montar el componente
  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const savedCompanyData = localStorage.getItem('companyData');
      
      if (savedCompanyData) {
        const companyData = JSON.parse(savedCompanyData);
        setFormData(companyData);
        console.log('✅ Perfil cargado:', companyData);
      }
    } catch (error) {
      console.error('❌ Error al cargar el perfil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('📤 Actualizando perfil...', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('companyData', JSON.stringify(formData));
      console.log('✅ Perfil actualizado exitosamente');
      alert('✅ Perfil actualizado exitosamente');
      setIsEditing(false);
    } catch (error) {
      console.error('❌ Error al actualizar:', error);
      alert('❌ Error al actualizar el perfil');
    }
  };

  const handleCancel = () => {
    fetchCompanyProfile();
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Funciones para las vistas de vacantes
  const handleCreateJob = () => {
    setActiveView("createJob");
  };

  const handleEditJobs = () => {
    setActiveView("editJobs");
  };

  const handleBackToProfile = () => {
    setActiveView("profile");
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="loading">Cargando perfil...</div>
      </div>
    );
  }

  // Vista de crear/editar vacantes (placeholder por ahora)
  if (activeView === "createJob" || activeView === "editJobs") {
    return (
      <div className="profile-container">
        <div className="vacancies-view">
          <div className="vacancies-header">
            <button className="back-btn" onClick={handleBackToProfile}>
              ← Volver al Perfil
            </button>
            <h2>{activeView === "createJob" ? "Crear Nueva Vacante" : "Editar Vacantes"}</h2>
          </div>
          <div className="vacancies-content">
            <p>🚧 Formulario de vacantes en construcción...</p>
            <p>Aquí irá el formulario para {activeView === "createJob" ? "crear" : "editar"} vacantes</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-layout">
        {/* Columna izquierda - Bienvenida y acciones */}
        <div className="left-column">
          <div className="welcome-section">
            <h2>Te damos la bienvenida,</h2>
            <h1>{formData.company_name || "Empresa"}</h1>
            <p>Estamos emocionados de tenerte en nuestra plataforma.</p>
          </div>

          <div className="actions-section">
            <button className="action-btn primary" onClick={handleCreateJob}>
              📄 Crear Vacante
            </button>
            <button className="action-btn secondary" onClick={handleEditJobs}>
              ✏️ Editar Vacantes
            </button>
          </div>
        </div>

        {/* Columna derecha - Datos del perfil */}
        <div className="right-column">
          <div className="profile-header">
            <h2>Perfil de la Empresa</h2>
            <div className="header-actions">
              {!isEditing ? (
                <button className="edit-btn" onClick={handleEdit}>
                  Editar Perfil
                </button>
              ) : (
                <div className="edit-actions">
                  <button type="submit" form="profile-form" className="save-btn">
                    Guardar
                  </button>
                  <button type="button" className="cancel-btn" onClick={handleCancel}>
                    Cancelar
                  </button>
                </div>
              )}
              <button className="back-btn" onClick={onBackToRouter}>
                ← Volver al Inicio
              </button>
            </div>
          </div>

          <form id="profile-form" className="profile-form" onSubmit={handleSubmit}>
            <div className="form-section combined-section">
              {/* Datos de la Empresa */}
              <div className="form-subsection">
                <h3>Datos de la Empresa</h3>
                
                <div className="form-group">
                  <label>Nombre de la empresa</label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                  {isEditing && <small>Evita groserías o marcas registradas.</small>}
                </div>

                <div className="form-group">
                  <label>Giro / Industria</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email de contacto</label>
                  <input
                    type="email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Dirección (Google Maps)</label>
                  <input
                    type="url"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Opcional"
                  />
                </div>

                <div className="form-group">
                  <label>Website / Redes Sociales</label>
                  <input
                    type="url"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Opcional"
                  />
                </div>

                <div className="form-group">
                  <label>Descripción breve</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Opcional"
                    rows="3"
                  />
                </div>
              </div>

              {/* Datos del Reclutador */}
              <div className="form-subsection">
                <h3>Datos del Reclutador</h3>
                
                <div className="form-group">
                  <label>Nombre completo</label>
                  <input
                    type="text"
                    name="recruiter_name"
                    value={formData.recruiter_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Puesto en la empresa</label>
                  <input
                    type="text"
                    name="recruiter_position"
                    value={formData.recruiter_position}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email del reclutador</label>
                  <input
                    type="email"
                    name="recruiter_email"
                    value={formData.recruiter_email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}