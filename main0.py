from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from typing import List, Optional

app = FastAPI()

# Подключение к БД
SQLALCHEMY_DATABASE_URL = "sqlite:///./salon.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class MasterModel(Base):
    __tablename__ = "masters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    specialization = Column(String, index=True)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class Service:
    def __init__(self, service_id, name, category_id, price):
        self.service_id = service_id
        self.name = name
        self.category_id = category_id
        self.price = price

class Category:
    def __init__(self, category_id, name):
        self.category_id = category_id
        self.name = name

categories = [
    Category(1, "Стрижки и укладки"),
    Category(2, "Маникюр и педикюр"),
    Category(3, "Брови и ресницы"),
    Category(4, "Спа-процедуры")
]

services = [
    Service(1, "Стрижка женская", 1, 3000),
    Service(2, "Укладка феном", 1, 1500),
    Service(3, "Стрижка креативная", 1, 4000),
    Service(4, "Стрижка мужская", 1, 2000),
    Service(5, "Окрашивание", 1, 5000),
    Service(6, "Маникюр", 2, 2500),
    Service(7, "Маникюр с наращиванием", 2, 4000),
    Service(8, "Педикюр", 2, 3000),
    Service(9, "Укрепление ногтей", 2, 1500),
    Service(10, "Маникюр в 4 руки", 2, 6000),
    Service(11, "Коррекция бровей воском", 3, 1000),
    Service(12, "Окрашивание бровей", 3, 1500),
    Service(13, "Ламинирование ресниц", 3, 3000),
    Service(14, "Ботокс для ресниц", 3, 2500),
    Service(15, 'SPA-программа "Релакс"', 4, 5000),
    Service(16, "Обертывание шоколадное", 4, 4000),
    Service(17, "Пилинг тела с морскими солями", 4, 3500),
    Service(18, "Массаж спины классический", 4, 4000),
]

def get_service(service_id):
    for s in services:
        if s.service_id == service_id:
            return s
    return None

# Временный код для заполнения базы (один раз)
db = SessionLocal()
if db.query(MasterModel).count() == 0:
    db.add(MasterModel(name="Анна", specialization="Парикмахер"))
    db.add(MasterModel(name="Мария", specialization="Визажист"))
    db.commit()
db.close()

# Список для хранения  записей
appointments = []


# 1. Класс Appointment
class Appointment:
    def __init__(self, appointment_id: int, client_name: str, master_id: int, service_id: int, time: str):

        self.id = appointment_id
        self.client_name = client_name
        self.master_id = master_id
        self.service_id = service_id
        self.time = time

    def __repr__(self):
        # Метод для удобного вывода в консоль
        return f"<Appointment: {self.client_name}, {self.time}>"


# Функция создания записи
def create_appointment(client_name: str, 
                       master_id: int, 
                       service_id: int, 
                       time: str,
) -> Appointment | None:
    # Проверка существования мастера и услуги
    if master_id not in [1, 2]:
        return None
        
    service = get_service(service_id)
    
    if service is None:
        return None
   
    # Проверка заполненности полей, вывод - None, елси не заполнены
    if not client_name or not time:
        return None

    # Проверка вермени работы салона 
    try:
        # Разбивате строку 10:00 на "10" и "00", превращает в int
        hours, minutes = map(int, time.split(':'))
    except ValueError:
        # Ловит ошибку неверного формата введенного времени
        return None

    # График работы салона, вне графика - нельзя записаться
    if hours < 8 or hours >= 20:
        return None

    # Создание обьекта класса Appointment после всех проверок
    appointment = Appointment(
        appointment_id=len(appointments) + 1, 
        client_name=client_name,
        master_id=master_id,
        service_id=service.service_id,
        time=time
    )
    
    # 5. Добавляет объект в глобальный список и возвращает его
    appointments.append(appointment)
    return appointment


@app.get("/")
def root():
    return {"message": "Salon API"}


# FAstAPI
# Вск мастера, все фильры
@app.get("/masters")
def get_all_masters(specialization: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(MasterModel)

    if specialization:
        query = query.filter(MasterModel.specialization == specialization)

    masters = query.all()
    
    return [
        {"id": m.id, "name": m.name, "specialization": m.specialization}
        for m in masters
    ]

# Один мастер по id
@app.get("/masters/{master_id}")
def get_master(master_id: int, db: Session = Depends(get_db)):
    # ИСПРАВЛЕНО: добавлены скобки в first()
    master = db.query(MasterModel).filter(MasterModel.id == master_id).first()

    if master is None:
        raise HTTPException(status_code=404, detail="Master not found")

    return {"id": master.id, "name": master.name, "specialization": master.specialization}


#Список категорий
@app.get("/categories")
def get_categories():
    result = []
    for cat in categories:
        count = sum(1 for s in services if s.category_id == cat.category_id)
        result.append({
            "id": cat.category_id,
            "name": cat.name,
            "servicesCount": count
        })
    return result

# Информауия по конкретной категории
@app.get("/categories/{category_id}")
def get_category(category_id: int):
    found_cat = None
    for cat in categories:
        if cat.category_id == category_id:
            found_cat = cat
            break
    if found_cat is None:
        raise HTTPException(status_code=404, detail="Category not found")

    count = sum(1 for s in services if s.category_id == found_cat.category_id)

    return {
        "id": found_cat.category_id,
        "name": found_cat.name,
        "servicesCount": count
    }

#Услуги
@app.get("/services/{service_id}")
def get_service_endpoint(service_id: int):
    for s in services:
        if s.service_id == service_id:
            return {
                "id": s.service_id,
                "name": s.name,
                "price": s.price
            }
    raise HTTPException(status_code=404, detail="Service not found")