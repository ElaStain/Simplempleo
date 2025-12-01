import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CandidateProfile.css";

export default function CandidateProfile() {
  const navigate = useNavigate();

  // Cargar datos desde localStorage si existen
  const storedData = JSON.parse(localStorage.getItem("candidateData")) || {
    username: "",
    email: "",
    phone: "",
    fullName: "",
    age: "",
    gender: "",
    hasJob: ""
  };

  const [profileData, setProfileData] = useState(storedData);
  const [isEditingPrivate, setIsEditingPrivate] = useState(false);
  const [tempData, setTempData] = useState(storedData);

  useEffect(() => {
    localStorage.setItem("candidateData", JSON.stringify(profileData));
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  const savePrivateProfile = () => {
    setProfileData({ ...tempData });
    setIsEditingPrivate(false);
  };

  return (
    <div className="candidate-profile-container">

      {/* Perfil Público */}
      <div className="profile-card public">
        <h2>Perfil Público</h2>
        <p className="username">{profileData.username || "Usuario"}</p>
        <p className="message"><em>Crea tu CV para postularte</em></p>
        <div className="public-buttons">
          <button onClick={() => navigate("/resume")}>Crear CV</button>
          <button onClick={() => navigate("/resume")}>Editar CV</button>
        </div>
      </div>

      {/* Perfil Privado */}
      <div className="profile-card private">
        <h2>Perfil Privado</h2>
        {!isEditingPrivate ? (
          <>
            <p>Nombre completo: {profileData.fullName || "No definido"}</p>
            <p>Edad: {profileData.age || "No definido"}</p>
            <p>Género: {profileData.gender || "No definido"}</p>
            <p>¿Cuenta con empleo actualmente?: {profileData.hasJob || "No definido"}</p>
            <p>Correo: {profileData.email || "No definido"}</p>
            <p>Celular: {profileData.phone || "No definido"}</p>
            <p className="message"><em>Completa tu perfil para una experiencia personalizada</em></p>
            <button onClick={() => setIsEditingPrivate(true)}>Editar</button>
          </>
        ) : (
          <>
            <label>Nombre completo</label>
            <input
              type="text"
              name="fullName"
              value={tempData.fullName}
              onChange={handleChange}
              placeholder="Nombre completo"
            />

            <label>Edad</label>
            <input
              type="number"
              name="age"
              value={tempData.age}
              onChange={handleChange}
              placeholder="Edad"
            />

            <label>Género</label>
            <select name="gender" value={tempData.gender} onChange={handleChange}>
              <option value="">Selecciona</option>
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
              <option value="nb">NB</option>
              <option value="prefiero no decirlo">Prefiero no decirlo</option>
              <option value="otro">Otro</option>
            </select>

            <label>¿Cuenta con empleo actualmente?</label>
            <select name="hasJob" value={tempData.hasJob} onChange={handleChange}>
              <option value="">Selecciona</option>
              <option value="sí">Sí</option>
              <option value="no">No</option>
            </select>

            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={tempData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
            />

            <label>Celular</label>
            <input
              type="tel"
              name="phone"
              value={tempData.phone}
              onChange={handleChange}
              placeholder="55 1234 5678"
            />

            <div className="private-buttons">
              <button onClick={savePrivateProfile}>Guardar</button>
              <button onClick={() => setIsEditingPrivate(false)}>Cancelar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
