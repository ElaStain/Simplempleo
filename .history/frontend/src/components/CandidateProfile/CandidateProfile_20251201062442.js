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
    employed: "",
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

  const goToResumeForm = () => {
    navigate("/resume");
  };

  return (
    <div className="candidate-profile-container">
      {/* Perfil Público */}
      <div className="profile-card public">
        <h2>Perfil Público</h2>
        <p className="username">{profileData.username || "Usuario"}</p>
        <p className="message">Crea tu CV para postularte</p>
        <div className="public-buttons">
          <button onClick={goToResumeForm}>Crear CV</button>
          <button onClick={goToResumeForm}>Editar CV</button>
        </div>
      </div>

      {/* Perfil Privado */}
      <div className="profile-card private">
        <h2>Perfil Privado</h2>
        {!isEditingPrivate ? (
          <>
            <p>Nombre de usuario: {profileData.username || "Usuario"}</p>
            <p>Correo: {profileData.email || "No definido"}</p>
            <p>Celular: {profileData.phone || "No definido"}</p>
            <p>Nombre completo: {profileData.fullName || "No definido"}</p>
            <p>Edad: {profileData.age || "No definido"}</p>
            <p>Género: {profileData.gender || "No definido"}</p>
            <p>¿Cuenta con empleo actualmente?: {profileData.employed || "No definido"}</p>
            <p className="message">
              Completa tu perfil para una experiencia personalizada
            </p>
            <div className="private-buttons">
              <button onClick={() => setIsEditingPrivate(true)}>Editar</button>
            </div>
          </>
        ) : (
          <>
            <label>Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={tempData.username}
              onChange={handleChange}
              placeholder="Nombre público"
            />
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
            <label>Nombre completo</label>
            <input
              type="text"
              name="fullName"
              value={tempData.fullName}
              onChange={handleChange}
              placeholder="Ej. Ana López"
            />
            <label>Edad</label>
            <input
              type="number"
              name="age"
              value={tempData.age}
              onChange={handleChange}
              placeholder="Ej. 25"
            />
            <label>Género</label>
            <select name="gender" value={tempData.gender} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="NB">NB</option>
              <option value="Prefiero no decirlo">Prefiero no decirlo</option>
              <option value="Otro">Otro</option>
            </select>
            <label>¿Cuenta con empleo actualmente?</label>
            <select
              name="employed"
              value={tempData.employed}
              onChange={handleChange}
            >
              <option value="">Seleccionar...</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>

            <div className="private-buttons">
              <button onClick={savePrivateProfile}>Guardar</button>
              <button
                className="cancel-btn"
                onClick={() => setIsEditingPrivate(false)}
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
