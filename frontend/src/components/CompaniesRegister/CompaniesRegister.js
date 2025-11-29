import React, { useState } from "react";
import "./CompaniesRegister.css";

export default function CompaniesRegister({ onRegisterSuccess }) {
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
    recruiter_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulación de llamada al backend
      console.log('📤 Enviando datos al servidor...', formData);
      
      // Simulamos un delay de red
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulación de respuesta exitosa del backend
      const mockResponse = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        created_at: new Date().toISOString(),
        status: "active"
      };
      
      console.log('✅ Empresa registrada (simulado):', mockResponse);
      
      // Guardar datos en localStorage para simular persistencia
      localStorage.setItem('companyData', JSON.stringify(mockResponse));
      localStorage.setItem('companyId', mockResponse.id);
      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      
      // Mostrar alerta de éxito
      alert('🎉 Empresa registrada exitosamente! Redirigiendo al perfil...');
      
      // Redirigir al perfil
      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
      
    } catch (error) {
      console.error('❌ Error en el registro:', error);
      alert('Error en el registro: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>REGISTRA TU NEGOCIO</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Sección Empresa */}
        <div className="form-section">
          <h3>Datos de la Empresa</h3>
          <label>Nombre de la empresa</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <small>Evita groserías o marcas registradas.</small>

          <label>Giro / Industria</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
            disabled={isLoading}
          />

          <label>Email de contacto</label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />

          <label>Dirección (Google Maps)</label>
          <input
            type="url"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Opcional"
            disabled={isLoading}
          />

          <label>Website / Redes Sociales</label>
          <input
            type="url"
            name="website_url"
            value={formData.website_url}
            onChange={handleChange}
            placeholder="Opcional"
            disabled={isLoading}
          />

          <label>Descripción breve</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Opcional"
            disabled={isLoading}
            rows="4"
          />
        </div>

        {/* Sección Reclutador */}
        <div className="form-section">
          <h3>Datos del Reclutador</h3>
          <label>Nombre completo</label>
          <input
            type="text"
            name="recruiter_name"
            value={formData.recruiter_name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <label>Puesto en la empresa</label>
          <input
            type="text"
            name="recruiter_position"
            value={formData.recruiter_position}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <label>Email del reclutador</label>
          <input
            type="email"
            name="recruiter_email"
            value={formData.recruiter_email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <label>Contraseña</label>
          <input
            type="password"
            name="recruiter_password"
            value={formData.recruiter_password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <span style={{color: '#ccc', fontSize: '14px', marginTop: '1rem'}}>
            He leído y acepto los{" "}
            <a href="/terminos" target="_blank" style={{color: '#8B5FBF'}}>Términos y Condiciones</a> y el{" "}
            <a href="/privacidad" target="_blank" style={{color: '#8B5FBF'}}>Aviso de Privacidad</a>.
          </span>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrar Empresa y Reclutador"}
          </button>

          {isLoading && (
            <div className="loading-message">
              ⏳ Validando Email...
            </div>
          )}
        </div>
      </form>
    </div>
  );
}