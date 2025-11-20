import React, { useState } from "react";
import "./CandidateRegister.css";

export default function CandidateRegister() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 Aquí luego conectamos con el backend Django (POST /api/register)
    console.log("DATA LISTA PARA ENVIAR:", formData);
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registro de Candidato</h2>

      <form className="register-form" onSubmit={handleSubmit}>
        
        <label>Nombre de usuario (Nombre + Apellido)</label>
        <input
          type="text"
          name="username"
          placeholder="Ej. AnaLopez"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <small className="note">
          ⚠️ Por ahora, recomendamos no usar tu nombre completo.
        </small>

        <label>Correo electrónico</label>
        <input
          type="email"
          name="email"
          placeholder="correo@ejemplo.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Celular (opcional)</label>
        <input
          type="tel"
          name="phone"
          placeholder="55 1234 5678"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="Mínimo 10 caracteres"
          value={formData.password}
          onChange={handleChange}
          minLength={10}
          required
        />
        <small className="note">
          Debe incluir mayúsculas, minúsculas, números y un signo.
        </small>

        <div className="checkbox-container">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
          />
          <span>
            He leído y acepto los{" "}
            <a href="/terminos" target="_blank">Términos y Condiciones</a> y el{" "}
            <a href="/privacidad" target="_blank">Aviso de Privacidad</a>.
          </span>
        </div>

        <button type="submit" className="submit-btn">
          Crear cuenta
        </button>
      </form>
    </div>
  );
}