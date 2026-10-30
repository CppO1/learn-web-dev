from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter(prefix="/categories", tags=["categories"])


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


class Service:
    def __init__(self, service_id, name, category_id, price):
        self.service_id = service_id
        self.name = name
        self.category_id = category_id
        self.price = price

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

@router.get("")
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

@router.get("/{category_id}")
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