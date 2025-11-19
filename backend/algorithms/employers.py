from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from ..config import get_settings
from ..database import get_session
from ..dependencies import require_editor, require_role
from ..models import EmployerProfile, User, UserRole
from ..schemas import EmployerProfilePayload
from ..security import decrypt_payload, encrypt_payload

router = APIRouter(prefix="/employers", tags=["employers"])
settings = get_settings()


def detect_rebalance_gender(porcentaje_mujeres: float, porcentaje_hombres: float) -> str | None:
    min_ratio_percentage = settings.min_gender_ratio * 100
    if porcentaje_mujeres < min_ratio_percentage:
        return "mujer"
    if porcentaje_hombres < min_ratio_percentage:
        return "hombre"
    return None


@router.put("/profile", response_model=dict)
def upsert_profile(
    payload: EmployerProfilePayload,
    current_user: User = Depends(require_role(UserRole.employer)),
    session: Session = Depends(get_session),
):
    encrypted = encrypt_payload(payload.dict())
    rebalance_gender = detect_rebalance_gender(
        payload.porcentaje_mujeres, payload.porcentaje_hombres
    )

    profile = session.exec(
        select(EmployerProfile).where(EmployerProfile.user_id == current_user.id)
    ).first()

    if profile:
        profile.encrypted_profile = encrypted
        profile.vacancy_policy_ack = True
    else:
        profile = EmployerProfile(
            user_id=current_user.id,
            encrypted_profile=encrypted,
            vacancy_policy_ack=True,
        )
        session.add(profile)

    session.commit()
    message = (
        "Debes priorizar postulantes del género con menor representación."
        if rebalance_gender
        else "Perfil empresarial actualizado."
    )
    return {"status": message, "rebalance_gender": rebalance_gender}


@router.get("/me", response_model=dict)
def read_my_profile(
    current_user: User = Depends(require_role(UserRole.employer)),
    session: Session = Depends(get_session),
):
    profile = session.exec(
        select(EmployerProfile).where(EmployerProfile.user_id == current_user.id)
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Perfil empresarial no encontrado")
    return decrypt_payload(profile.encrypted_profile)


@router.get("/{user_id}", response_model=dict)
def read_profile_editor(
    user_id: int,
    _: User = Depends(require_editor),
    session: Session = Depends(get_session),
):
    profile = session.exec(
        select(EmployerProfile).where(EmployerProfile.user_id == user_id)
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Perfil empresarial no encontrado")
    return decrypt_payload(profile.encrypted_profile)



