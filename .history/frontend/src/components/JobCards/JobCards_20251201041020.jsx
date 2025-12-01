import React from "react";
import { useNavigate } from "react-router-dom";
import "./JobCards.css";

const fakeJobs = 
[
  { id: 1, company: "SimpleEmpleo", title: "Pasante en Reclutamiento", salary: "$4,500 - $6,000 MXN", location: "Alcaldía Benito Juárez", schedule: "Lun-Vie · 10:00 - 15:00" },
  { id: 2, company: "Taquería El Buen Taco", title: "Ayudante de Cocina", salary: "$5,500 MXN + propinas", location: "Alcaldía Iztapalapa", schedule: "Lun-Dom · 15:00 - 23:00 (rotativo)" },
  { id: 3, company: "Tortillería La Niña", title: "Vendedor(a) Mostrador", salary: "$5,000 MXN", location: "Alcaldía Benito Juárez", schedule: "Lun-Sáb · 6:00 - 14:00" },
  { id: 4, company: "Fonda Doña Lupita", title: "Lavaloza / Mantenimiento", salary: "$4,800 MXN + comida", location: "Alcaldía Coyoacán", schedule: "Lun-Sáb · 12:00 - 20:00" },
  { id: 5, company: "Panadería La Aurosa", title: "Cajero(a) Matutino", salary: "$5,200 MXN", location: "Alcaldía Álvaro Obregón", schedule: "Mar-Dom · 5:00 - 13:00" },
  { id: 6, company: "Carnicería El Chucho", title: "Ayudante de Carnicero", salary: "$5,800 MXN", location: "Alcaldía Gustavo A. Madero", schedule: "Lun-Vie · 7:00 - 16:00" },
  { id: 7, company: "Cafetería Aroma", title: "Mesero(a) de Tiempo Completo", salary: "$4,500 MXN + propinas", location: "Alcaldía Miguel Hidalgo", schedule: "Mié-Dom · 8:00 - 17:00" },
  { id: 8, company: "Taller Mecánico Rápido", title: "Llantero / Auxiliar Mecánico", salary: "$6,000 MXN", location: "Alcaldía Iztacalco", schedule: "Lun-Sáb · 9:00 - 18:00" },
  { id: 9, company: "Verdulería El Mercado", title: "Acomodador / Empacador", salary: "$4,500 MXN", location: "Alcaldía Azcapotzalco", schedule: "Lun-Dom · 7:00 - 15:00 (descansa un día)" },
  { id: 10, company: "Tortas Don Pepe", title: "Repartidor con Moto Propia", salary: "$5,500 MXN + viáticos gasolina", location: "Alcaldía Xochimilco", schedule: "Mar-Dom · 11:00 - 20:00" },
  { id: 11, company: "Papelería Central", title: "Auxiliar de Almacén", salary: "$5,000 MXN", location: "Alcaldía Tlalpan", schedule: "Lun-Vie · 8:00 - 17:00" },
  { id: 12, company: "Fondita El Buen Sabor", title: "Lavaplatos / Preparador", salary: "$5,000 MXN + alimentación", location: "Alcaldía Venustiano Carranza", schedule: "Lun-Sáb · 10:00 - 19:00" },
  { id: 13, company: "Librería Punto y Coma", title: "Atención a Clientes", salary: "$5,500 MXN", location: "Alcaldía Miguel Hidalgo", schedule: "Lun-Vie · 9:00 - 19:00, Sáb 9:00 - 15:00" },
  { id: 14, company: "Pizzería Roma", title: "Pizzero Aprendiz", salary: "$5,800 MXN", location: "Alcaldía Cuauhtémoc", schedule: "Mié-Dom · 16:00 - 00:00" },
  { id: 15, company: "Mueblería El Sillón", title: "Ayudante General / Mandadero", salary: "$5,200 MXN", location: "Alcaldía Iztapalapa", schedule: "Lun-Sáb · 8:00 - 17:00" },
  { id: 16, company: "Ciber Café Punto Net", title: "Encargado de Turno", salary: "$5,500 MXN", location: "Alcaldía Gustavo A. Madero", schedule: "Lun-Vie · 14:00 - 22:00" },
  { id: 17, company: "Lavandería Express", title: "Operador de Máquinas", salary: "$5,300 MXN", location: "Alcaldía Benito Juárez", schedule: "Mar-Dom · 9:00 - 18:00" },
  { id: 18, company: "Tienda de Abarrotes 24hrs", title: "Cajero Nocturno", salary: "$6,500 MXN", location: "Alcaldía Coyoacán", schedule: "Nocturno rotativo · 22:00 - 8:00" },
  { id: 19, company: "Ferretería El Clavo", title: "Vendedor de Piso", salary: "$5,500 MXN + comisiones", location: "Alcaldía Xochimilco", schedule: "Lun-Sáb · 9:00 - 19:00" },
  { id: 20, company: "Panadería La Especial", title: "Panadero Ayudante", salary: "$6,000 MXN", location: "Alcaldía Álvaro Obregón", schedule: "Nocturno · 22:00 - 6:00 (Lun a Sáb)" }
];

export default function JobCards() {
  const navigate = useNavigate();

  const openJob = (job) => {
    if (job.company === "SimpleEmpleo") {
      navigate("/job/simplempleo");
    } else {
      alert(`Demo: la vacante de ${job.company} es ficticia — solo SimpleEmpleo abre.`);
    }
  };

  return (
    <div className="jobs-page">
      <header className="jobs-header">
        <h1>Vacantes disponibles</h1>
        <p className="subtitle">Explora oportunidades en pymes locales</p>
      </header>

      <section className="jobs-grid">
        {fakeJobs.map((job) => (
          <article className="job-card" key={job.id}>
            <div className="card-top">
              <div className="logo-placeholder">{job.company.split(" ")[0].slice(0,2).toUpperCase()}</div>
              <div className="company-info">
                <h3 className="company-name">{job.company}</h3>
                <p className="job-title">{job.title}</p>
              </div>
            </div>

            <ul className="job-meta">
              <li><strong>Salario:</strong> {job.salary}</li>
              <li><strong>Ubicación:</strong> {job.location}</li>
              <li><strong>Horario:</strong> {job.schedule}</li>
            </ul>

            <div className="card-actions">
              <button className="btn-primary" onClick={() => openJob(job)}>Abrir</button>
              <button className="btn-secondary" onClick={() => alert('Guardado en favoritos (demo)')}>❤ Guardar</button>
            </div>
          </article>
        ))}
      </section>

    </div>
  );
}
