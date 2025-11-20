import React, { useState } from "react";
import "./CompanyRegister.css";

export default function CompanyRegister() {
  const [formData, setFormData] = useState({
    company_name: "",
    industry: "",
    contact_email: "",
    address: "",
    website_url: "",
    description: "",
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
      <h2>Registro de Empresa</h2>
      <form className="register-form" onSubmit={handleSubmit}>
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

        <label>Website</label>
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

        <button type="submit">Registrar Empresa</button>
      </form>
    </div>
  );
}
