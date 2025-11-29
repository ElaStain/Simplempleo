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

  // Cargar datos del perfil al montar el componente
  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      // Simulamos la carga de datos desde localStorage
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const savedCompanyData = localStorage.getItem('companyData');
      
      if (savedCompanyData) {
        const companyData = JSON.parse(savedCompanyData);
        setFormData(companyData);
        console.log('✅ Perfil cargado:', companyData);
      } else {
        console.log('📝 No hay datos guardados, mostrando formulario vacío');
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
      // Simulación de actualización en el backend
      console.log('📤 Actualizando perfil...', formData);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Guardar datos actualizados en localStorage
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
    // Recargar datos originales
    fetchCompanyProfile();
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
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
      <div className="profile-header">
        <h2>PERFIL DE LA EMPRESA</h2>
        <div className="header-actions">
          {!isEditing && (
            <button className="edit-btn" onClick={handleEdit}>
              Editar Perfil
            </button>
          )}
          <button className="back-btn" onClick={onBackToRouter}>
            ← Volver al Inicio
          </button>
        </div>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        {/* Sección Empresa */}
        <div className="form-section">
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
              rows="4"
            />
          </div>
        </div>

        {/* Sección Reclutador */}
        <div className="form-section">
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

        {/* Botones de acción */}
        {isEditing && (
          <div className="form-actions">
            <button type="submit" className="save-btn">
              Guardar Cambios
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        )}
      </form>
    </div>
  );
}