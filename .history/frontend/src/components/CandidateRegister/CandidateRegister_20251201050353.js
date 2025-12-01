import React, { useState, useEffect } from "react";
import "./CandidateProfile.css";

export default function CandidateProfile() {
  // Cargar datos desde localStorage si existen
  const storedData = JSON.parse(localStorage.getItem("candidateData")) || {
    username: "",
    email: "",
    phone: "",
  };

  const [profileData, setProfileData] = useState(storedData);
  const [isEditingPublic, setIsEditingPublic] = useState(false);
  const [isEditingPrivate, setIsEditingPrivate] = useState(false);
  const [tempData, setTempData] = useState(storedData);

  useEffect(() => {
    localStorage.setItem("candidateData", JSON.stringify(profileData));
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  const savePublicProfile = () => {
    setProfileData({ ...profileData, username: tempData.username });
    setIsEditingPublic(false);
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
        {!isEditingPublic ? (
          <>
            <p className="username">{profileData.username || "Usuario"}</p>
            <p className="message">Crea tu CV para postularte</p>
            <button onClick={() => setIsEditingPublic(true)}>Editar</button>
          </>
        ) : (
          <>
            <input
              type="text"
              name="username"
              value={tempData.username}
              onChange={handleChange}
              placeholder="Nombre público"
            />
            <button onClick={savePublicProfile}>Guardar</button>
            <button onClick={() => setIsEditingPublic(false)}>Cancelar</button>
          </>
        )}
      </div>

      {/* Perfil Privado */}
      <div className="profile-card private">
        <h2>Perfil Privado</h2>
        {!isEditingPrivate ? (
          <>
            <p>Nombre de usuario: {profileData.username || "Usuario"}</p>
            <p>Correo: {profileData.email || "No definido"}</p>
            <p>Celular: {profileData.phone || "No definido"}</p>
            <p className="message">
              Completa tu perfil para una experiencia personalizada
            </p>
            <button onClick={() => setIsEditingPrivate(true)}>Editar</button>
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
            <button onClick={savePrivateProfile}>Guardar</button>
            <button onClick={() => setIsEditingPrivate(false)}>Cancelar</button>
          </>
        )}
      </div>
    </div>
  );
}