from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from sqlalchemy import insert, select
from sqlalchemy.exc import IntegrityError
from db import engine, users
import bcrypt
import jwt_auth

router = APIRouter()
# User Class
class User(BaseModel):
    username: str
    password: str

# Endpoint: Create User
@router.post("/create-user")
def create_user(user: User):
    salt = bcrypt.gensalt(rounds=12)
    password_bytes = user.password.encode('utf-8')
    hashed = bcrypt.hashpw(password_bytes, salt)

    query = insert(users).values(
        username=user.username,
        password=hashed
    )

    try:
        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

            user_id = result.inserted_primary_key[0]

        return {
            "message": "User created successfully",
            "user_id": user_id,
            "username": user.username
        }

    except IntegrityError:
        raise HTTPException(
            status_code=409,
            detail="Username already exists"
        )

@router.post("/login")
def create_user(user:User):
    query = select(users).where(users.c.username == user.username)

    with engine.connect() as connection:
        result = connection.execute(query)
        db_user = result.fetchone()

    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    if not bcrypt.checkpw(user.password.encode('utf-8'), db_user.password.encode('utf-8')):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    token = jwt_auth.create_access_token(db_user.id)

    return {
        "message": "Login successful",
        "user_id": db_user.id,
        "username": db_user.username,
        "access_token": token,
        "token_type": "bearer"
    }
