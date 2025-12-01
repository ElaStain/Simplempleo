import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  // Cargar datos del perfil
  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const savedCompanyData = localStorage.getItem("companyData");

      if (savedCompanyData) {
        const companyData = JSON.parse(savedCompanyData);
        setFormData(companyData);
        console.log("✅ Perfil cargado:", companyData);
      }
    } catch (error) {
      console.error("❌ Error al cargar el perfil:", error);
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
      console.log("📤 Actualizando perfil...", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("companyData", JSON.stringify(formData));
      console.log("✅ Perfil actualizado exitosamente");
      alert("✅ Perfil actualizado exitosamente");
      setIsEditing(false);
    } catch (error) {
      console.error("❌ Error al actualizar:", error);
      alert("❌ Error al actualizar el perfil");
    }
  };

  const handleCancel = () => {
    fetchCompanyProfile();
    setIsEditing(false);
  };

  // 🔥 FIX PARA DEMO: forzar navegación real
  const handleCreateJob = () => {
    window.location.href = "/create-job";
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="loading">Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-layout">
        {/* Columna izquierda */}
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
          </div>
        </div>

        {/* Columna derecha */}
        <div className="right-column">
          <div className="profile-header">
            <h2>Perfil de la Empresa</h2>
            <div className="header-actions">
              {!isEditing ? (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Editar Perfil
                </button>
              ) : (
                <div className="edit-actions">
                  <button type="submit" form="profile-form" className="save-btn">
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
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
              {/* Datos de la empresa */}
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
                    rows="3"
                    placeholder="Opcional"
                  />
                </div>
              </div>

              {/* Datos del reclutador */}
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
