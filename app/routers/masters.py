from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, List
from app.database import get_db
from app.models import MasterModel

router = APIRouter(prefix="/masters", tags=["masters"])

# Получить всех мастеров с фильтрацией
@router.get("")
def get_masters(specialization: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(MasterModel)
    if specialization:
        query = query.filter(MasterModel.specialization == specialization)
    masters = query.all()
    return [{"id": m.id, "name": m.name, "specialization": m.specialization} for m in masters]

# Получить одного мастера по ID
@router.get("/{master_id}")
def get_master(master_id: int, db: Session = Depends(get_db)):
    master = db.query(MasterModel).filter(MasterModel.id == master_id).first()
    if master is None:
        raise HTTPException(status_code=404, detail="Master not found")
    return {"id": master.id, "name": master.name, "specialization": master.specialization}