from fastapi import HTTPException, APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import insert, select, delete, update
from datetime import date
from decimal import Decimal
from db import engine, fills
import jwt_auth

router = APIRouter()

# Fills Routes and Models
class Fill(BaseModel):
    fill_date: date
    station_name: str
    station_location: str
    price: Decimal
    total_cost: Decimal
    litres: Decimal
    vehicle: str

@router.get("/fills")
def get_games(user_id: int = Depends(jwt_auth.get_current_user)):
    query = select(fills).where(fills.c.user_id == user_id)
    returned = []

    with engine.connect() as connection:
        result = connection.execute(query)
        for row in result:
            dictionary = {"id": row.id, "fill_date": row.fill_date, "station_name": row.station_name, "station_location": row.station_location, "price": row.price, "total_cost": row.total_cost, "litres": row.litres, "vehicle": row.vehicle }
            returned.append(dictionary)

    return returned

@router.get("/fills/{id}")
def get_games(id: int, user_id: int = Depends(jwt_auth.get_current_user)):
    query = select(fills).where(fills.c.id == id, fills.c.user_id == user_id)
    returned = {}

    with engine.connect() as connection:
        result = connection.execute(query).mappings().first()

        if result is None:
            raise HTTPException(status_code=404, detail="Fill not found")

        returned["fill_date"] = result["fill_date"]
        returned["station_name"] = result["station_name"]
        returned["station_location"] = result["station_location"]
        returned["price"] = result["price"]
        returned["total_cost"] = result["total_cost"]
        returned["litres"] = result["litres"]
        returned["vehicle"] = result["vehicle"]
        
    return returned

        
@router.post("/fills/create")
def create_game(fill:Fill, user_id: int = Depends(jwt_auth.get_current_user)):
    query = insert(fills).values(
        user_id=user_id,
        fill_date=fill.fill_date,
        station_name=fill.station_name,
        station_location=fill.station_location,
        price=fill.price,
        total_cost=fill.total_cost,
        litres=fill.litres,
        vehicle=fill.vehicle
    )

    with engine.connect() as connection:
        result = connection.execute(query)
        connection.commit()
        inserted = result.inserted_primary_key[0]

    return {
        "fill_id": inserted
    }

@router.put("/fills/update/{id}")
def update_game(id: int, fill:Fill, user_id: int = Depends(jwt_auth.get_current_user)):
    query = update(fills).where(fills.c.id == id, fills.c.user_id == user_id).values(
        fill_date=fill.fill_date,
        station_name=fill.station_name,
        station_location=fill.station_location,
        price=fill.price,
        total_cost=fill.total_cost,
        litres=fill.litres,
        vehicle=fill.vehicle
    )

    with engine.connect() as connection:
        result = connection.execute(query)
        connection.commit()
        if result.rowcount == 0:
            raise HTTPException(
                status_code=404,
                detail="Fill Not Found"
            )

    return {
        "fill_id": id
    }

@router.delete("/fills/delete/{id}")
def delete_game(id: int, user_id: int = Depends(jwt_auth.get_current_user)):
    query = delete(fills).where(fills.c.id == id, fills.c.user_id == user_id)

    with engine.connect() as connection:
        result = connection.execute(query)
        connection.commit()

        if result.rowcount == 0:
            raise HTTPException(
                status_code=404,
                detail="Fill Not Found"
            )

    return {
        "fill_id": "deleted"
    }
