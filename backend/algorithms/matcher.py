from __future__ import annotations

import math
from dataclasses import dataclass
from typing import List, Tuple

import numpy as np
from fastapi import HTTPException
from sqlmodel import Session, select

from ..config import get_settings
from ..models import EmployeeProfile, JobPosting, EmployerProfile
from ..security import decrypt_payload, safe_decrypt_payload

settings = get_settings()


def relu(x: np.ndarray) -> np.ndarray:
    return np.maximum(0, x)


def sigmoid(x: np.ndarray) -> np.ndarray:
    return 1.0 / (1.0 + np.exp(-x))


@dataclass
class TrainingArtifacts:
    covariance: List[List[float]]
    variance: List[float]
    learning_rate: float
    model_version: str


class NeuralMatcher:
    def __init__(self, input_dim: int, hidden_dim: int = 8, lr: float = 0.05, epochs: int = 400):
        self.input_dim = input_dim
        self.hidden_dim = hidden_dim
        self.lr = lr
        self.epochs = epochs
        self.W1 = np.random.randn(input_dim, hidden_dim) * 0.1
        self.b1 = np.zeros((1, hidden_dim))
        self.W2 = np.random.randn(hidden_dim, 1) * 0.1
        self.b2 = np.zeros((1, 1))

    def _forward(self, X: np.ndarray) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
        z1 = X @ self.W1 + self.b1
        a1 = relu(z1)
        z2 = a1 @ self.W2 + self.b2
        y_hat = sigmoid(z2)
        return z1, a1, y_hat

    def train(self, X: np.ndarray, y: np.ndarray) -> None:
        for _ in range(self.epochs):
            z1, a1, y_hat = self._forward(X)
            dz2 = y_hat - y
            dW2 = a1.T @ dz2 / len(X)
            db2 = np.sum(dz2, axis=0, keepdims=True) / len(X)

            da1 = dz2 @ self.W2.T
            dz1 = da1 * (z1 > 0)
            dW1 = X.T @ dz1 / len(X)
            db1 = np.sum(dz1, axis=0, keepdims=True) / len(X)

            self.W2 -= self.lr * dW2
            self.b2 -= self.lr * db2
            self.W1 -= self.lr * dW1
            self.b1 -= self.lr * db1

    def predict(self, X: np.ndarray) -> np.ndarray:
        _, _, y_hat = self._forward(X)
        return y_hat


def experience_score(experiencia: str) -> float:
    mapping = {
        "menor a 6 meses": 0.2,
        "de 6 meses a 1 año": 0.4,
        "de 1 a 3 años": 0.7,
        "mayor a 3 años": 0.9,
    }
    return mapping.get(experiencia.strip().lower(), 0.5)


def build_employee_vector(payload: dict) -> Tuple[List[float], float]:
    age_norm = payload.get("edad", 20) / 100
    exp_norm = experience_score(payload.get("experiencia", "de 6 meses a 1 año"))
    skills = payload.get("destrezas", [])
    virtues = payload.get("virtudes", [])
    questionnaire = payload.get("cuestionario", {})
    preference_score = float(questionnaire.get("afinidad_area", 0.5))

    feature_vector = [
        round(age_norm, 2),
        round(exp_norm, 2),
        round(min(len(skills) / 10, 1.0), 2),
        round(min(len(virtues) / 10, 1.0), 2),
        round(preference_score, 2),
    ]
    base_label = 0.6 * feature_vector[2] + 0.4 * feature_vector[3]
    label = 1.0 if base_label >= 0.6 else 0.0
    return feature_vector, label


def build_job_vector(job: JobPosting) -> List[float]:
    salary_avg = (job.salary_min + job.salary_max) / 2 if job.salary_max else job.salary_min
    salary_norm = min(salary_avg / 1000, 1.0)
    skills_required = job.skills_required.split(",") if job.skills_required else []
    skill_density = min(len(skills_required) / 10, 1.0)
    modality_hash = (hash(job.modality.lower()) % 97) / 100
    return [round(salary_norm, 2), round(skill_density, 2), round(modality_hash, 2)]


def build_training_matrix(session: Session) -> Tuple[np.ndarray, np.ndarray, TrainingArtifacts]:
    employees = session.exec(select(EmployeeProfile)).all()
    jobs = session.exec(select(JobPosting)).all()
    if not employees:
        raise HTTPException(status_code=400, detail="No existen perfiles de empleados para entrenar")

    if not jobs:
        dummy_job = JobPosting(
            employer_id=0,
            title="Temporal",
            salary_min=100,
            salary_max=200,
            activities="",
            modality="presencial",
            skills_required="responsabilidad",
            schedule="",
        )
        jobs = [dummy_job]

    samples: list[list[float]] = []
    labels: list[float] = []
    for profile in employees:
        payload = decrypt_payload(profile.encrypted_profile)
        employee_vector, employee_label = build_employee_vector(payload)
        for job in jobs:
            job_vector = build_job_vector(job)
            combined = employee_vector + job_vector
            skill_overlap = compatibility_score(payload.get("destrezas", []), job.skills_required)
            combined_label = 0.5 * employee_label + 0.5 * skill_overlap
            samples.append(combined)
            labels.append(1.0 if combined_label >= settings.recommendation_threshold else 0.0)

    X = np.array(samples)
    y = np.array(labels).reshape(-1, 1)

    covariance = np.cov(X, rowvar=False).tolist()
    variance = np.var(X, axis=0).tolist()

    artifacts = TrainingArtifacts(
        covariance=covariance,
        variance=variance,
        learning_rate=0.05,
        model_version="v1.0.0",
    )

    print("=== MATRIZ DE COVARIANZA ===")
    for row in covariance:
        print(row)
    print("=== VECTOR DE VARIANZAS ===")
    print(variance)
    print(f"Learning rate: {artifacts.learning_rate}, Epochs: 400")
    print(f"Dataset source URL: {settings.dataset_source_url}")

    return X, y, artifacts


def compatibility_score(employee_skills: list[str], job_skills_raw: str | None) -> float:
    if not job_skills_raw:
        return 0.5
    job_skills = [skill.strip().lower() for skill in job_skills_raw.split(",") if skill.strip()]
    employee_set = {skill.strip().lower() for skill in employee_skills}
    if not job_skills:
        return 0.5
    overlap = len(employee_set.intersection(job_skills))
    return min(overlap / len(job_skills), 1.0)


def determine_target_gender(employer_profile: EmployerProfile) -> str | None:
    if not employer_profile:
        return None
    company_data = safe_decrypt_payload(employer_profile.encrypted_profile)
    min_ratio_percentage = settings.min_gender_ratio * 100
    mujeres = company_data.get("porcentaje_mujeres", 0)
    hombres = company_data.get("porcentaje_hombres", 0)
    if mujeres < min_ratio_percentage:
        return "mujer"
    if hombres < min_ratio_percentage:
        return "hombre"
    return None


def recommend_candidates(session: Session, job_id: int):
    job = session.get(JobPosting, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Vacante no encontrada")

    employer_profile = session.get(EmployerProfile, job.employer_id)
    target_gender = determine_target_gender(employer_profile)

    X, y, artifacts = build_training_matrix(session)
    matcher = NeuralMatcher(input_dim=X.shape[1], lr=artifacts.learning_rate)
    matcher.train(X, y)

    job_vector = build_job_vector(job)
    profiles = session.exec(select(EmployeeProfile)).all()
    recommendations = []
    for profile in profiles:
        payload = decrypt_payload(profile.encrypted_profile)
        employee_gender = payload.get("genero", "").strip().lower()
        if target_gender:
            if target_gender == "mujer" and "mujer" not in employee_gender:
                continue
            if target_gender == "hombre" and "hombre" not in employee_gender:
                continue

        employee_vector, _ = build_employee_vector(payload)
        combined = np.array([employee_vector + job_vector])
        score = float(matcher.predict(combined)[0][0])
        if score >= settings.recommendation_threshold:
            anonymized = safe_decrypt_payload(profile.anonymized_vector)
            recommendations.append(
                {
                    "candidate_id": profile.user_id,
                    "anonymized_vector": anonymized,
                    "score": round(score, 3),
                }
            )

    recommendations.sort(key=lambda item: item["score"], reverse=True)
    return recommendations, artifacts, target_gender


