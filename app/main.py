from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Импорт роутеров
from app.routers import masters, categories, services
from app.database import engine, Base
from app.models import MasterModel
from app.database import SessionLocal

# Создание таблицы в БД
Base.metadata.create_all(bind=engine)

# Временное заполнение БД 
db = SessionLocal()
if db.query(MasterModel).count() == 0:
    db.add(MasterModel(name="Анна", specialization="Парикмахер"))
    db.add(MasterModel(name="Мария", specialization="Визажист"))
    db.commit()
db.close()

app = FastAPI(title="Salon API")

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение роутеров
app.include_router(masters.router)
app.include_router(categories.router)
app.include_router(services.router)

@app.get("/")
def root():
    return {"message": "Salon API is running"}