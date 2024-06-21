from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from pydantic import BaseModel
from app.database import engine, Base, SessionLocal
from app.models import User, Transaction
from app.cors import add_cors_middleware

# Создаем таблицы на основе моделей
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Настройка CORS
add_cors_middleware(app)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class UserStatusUpdate(BaseModel):
    payment_status: str

@app.get("/users")
def read_users(db: Session = Depends(get_db)):
    users = db.query(User).options(joinedload(User.transactions)).all()
    return users

@app.put("/users/{user_id}/status")
def update_user_status(user_id: int, status_update: UserStatusUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.payment_status = status_update.payment_status
    db.commit()
    db.refresh(user)
    return user
