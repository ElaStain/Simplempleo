import React, { useState, useEffect } from "react";
import "./CompaniesProfile.css";

export default function CompaniesProfile() {
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
      // En una implementación real, obtendrías el ID de la empresa del contexto o localStorage
      const companyId = localStorage.getItem('companyId');
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`http://localhost:8000/api/companies/${companyId}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const companyData = await response.json();
        setFormData(companyData);
      } else {
        console.error('❌ Error al cargar el perfil');
        alert('Error al cargar los datos del perfil');
      }
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      alert('Error de conexión con el servidor');
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
      const companyId = localStorage.getItem('companyId');
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`http://localhost:8000/api/companies/${companyId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('✅ Perfil actualizado:', result);
        alert('Perfil actualizado exitosamente');
        setIsEditing(false);
      } else {
        console.error('❌ Error:', result.error);
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      alert('Error de conexión con el servidor');
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
        {!isEditing && (
          <button className="edit-btn" onClick={handleEdit}>
            Editar Perfil
          </button>
        )}
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