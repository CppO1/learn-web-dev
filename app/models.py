from sqlalchemy import Column, Integer, String
from app.database import Base

class MasterModel(Base):
    __tablename__ = "masters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    specialization = Column(String, index=True)