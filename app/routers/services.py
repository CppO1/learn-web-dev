from fastapi import APIRouter, HTTPException
from app.routers.categories import services  

router = APIRouter(prefix="/services", tags=["services"])

@router.get("/{service_id}")
def get_service_endpoint(service_id: int):
    for s in services:
        if s.service_id == service_id:
            return {
                "id": s.service_id,
                "name": s.name,
                "price": s.price
            }
    raise HTTPException(status_code=404, detail="Service not found")