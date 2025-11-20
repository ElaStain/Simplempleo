import React, { useState } from "react";
import "./CompaniesRegister.css";

export default function CompaniesRegister() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("DATA EMPRESA LISTA PARA ENVIAR:", formData);
    // 👉 POST /api/companies aquí
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
          />
          <small>Evita groserías o marcas registradas.</small>

          <label>Giro / Industria</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
          />

          <label>Email de contacto</label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            required
          />

          <label>Dirección (Google Maps)</label>
          <input
            type="url"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Opcional"
          />

          <label>Website / Redes Sociales</label>
          <input
            type="url"
            name="website_url"
            value={formData.website_url}
            onChange={handleChange}
            placeholder="Opcional"
          />

          <label>Descripción breve</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Opcional"
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
          />
          <label>Puesto en la empresa</label>
          <input
            type="text"
            name="recruiter_position"
            value={formData.recruiter_position}
            onChange={handleChange}
            required
          />
          <label>Email del reclutador</label>
          <input
            type="email"
            name="recruiter_email"
            value={formData.recruiter_email}
            onChange={handleChange}
            required
          />
          <label>Contraseña</label>
          <input
            type="password"
            name="recruiter_password"
            value={formData.recruiter_password}
            onChange={handleChange}
            required
          />
          <span>
            He leído y acepto los{" "}
            <a href="/terminos" target="_blank">Términos y Condiciones</a> y el{" "}
            <a href="/privacidad" target="_blank">Aviso de Privacidad</a>.
          </span>

          <button type="submit" className="submit-btn">
            Registrar Empresa y Reclutador
          </button>
        </div>
      </form>
    </div>
  );
}