from fastapi import FastAPI, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
import hashlib
from app.database import engine, Base
from app.models import Admin
from app.cors import add_cors_middleware

# Создаем таблицы на основе моделей
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Настройка CORS
add_cors_middleware(app)


class LoginData(BaseModel):
    username: str
    password: str


@app.post("/login")
async def login(login_data: LoginData):
    with Session(engine) as session:
        hashed_password = hashlib.sha256(login_data.password.encode()).hexdigest()
        result = session.query(Admin).filter(Admin.username == login_data.username,
                                             Admin.password == hashed_password).first()
        if result:
            return {"message": "Login successful"}
        else:
            raise HTTPException(status_code=401, detail="Invalid username or password")
