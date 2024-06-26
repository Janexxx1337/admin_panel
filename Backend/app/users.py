from datetime import datetime

from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session, joinedload

from app.cors import add_cors_middleware
from app.database import engine, Base
from app.models import User, Withdrawal
from app.database import get_db

# Создаем таблицы на основе моделей
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Настройка CORS
add_cors_middleware(app)

class UserStatusUpdate(BaseModel):
    payment_status: str

class BalanceUpdate(BaseModel):
    amount: float
    action: str

class WithdrawalRequest(BaseModel):
    item_name: str
    status: str

@app.get("/")
def read_users(db: Session = Depends(get_db)):
    users = db.query(User).options(joinedload(User.transactions)).all()
    return users

@app.get("/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).options(joinedload(User.deposits), joinedload(User.withdrawals)).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.put("/{user_id}/status")
def update_user_status(user_id: int, status_update: UserStatusUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.payment_status = status_update.payment_status
    db.commit()
    db.refresh(user)
    return user

@app.put("/{user_id}/ban")
def ban_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.banned = True
    db.commit()
    db.refresh(user)
    return {"message": f"User {user_id} banned successfully"}

@app.put("/{user_id}/balance")
def update_balance(user_id: int, balance_update: BalanceUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if balance_update.action == 'credit':
        user.balance += balance_update.amount
    elif balance_update.action == 'debit':
        user.balance -= balance_update.amount
        if user.balance < 0:
            user.balance = 0
    db.commit()
    db.refresh(user)
    return user

@app.post("/users/{user_id}/withdrawals")
def create_withdrawal(user_id: int, withdrawal_request: WithdrawalRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    new_withdrawal = Withdrawal(
        item_name=withdrawal_request.item_name,
        status=withdrawal_request.status,
        request_date=datetime.now(),
        user_id=user_id
    )
    db.add(new_withdrawal)
    db.commit()
    db.refresh(new_withdrawal)
    return new_withdrawal
