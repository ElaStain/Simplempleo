import React from "react";
import "./CandidateProfile.css";

const CandidateProfile = ({ username, onEditPublic, onEditPrivate }) => {
  return (
    <div className="candidate-profile-page">
      <div className="profile-container">
        {/* Perfil Público */}
        <div className="profile-card public-profile">
          <h2>Perfil Público</h2>
          <p className="username">{username || "Nombre de Usuario"}</p>
          <p className="message">Crea tu CV para postularte</p>
          <button className="btn-edit" onClick={onEditPublic}>
            Editar
          </button>
        </div>

        {/* Perfil Privado */}
        <div className="profile-card private-profile">
          <h2>Perfil Privado</h2>
          <p className="message">
            Completa tu perfil para una experiencia personalizada
          </p>
          <button className="btn-edit" onClick={onEditPrivate}>
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
