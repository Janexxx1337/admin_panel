from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base


class Admin(Base):
    __tablename__ = 'admins'
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nickname = Column(String(255), unique=True, nullable=False)
    balance = Column(Float, nullable=False)
    payment_status = Column(String(100), nullable=False)
    transactions = relationship("Transaction", back_populates="user")


class Transaction(Base):
    __tablename__ = 'transactions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    amount = Column(Float)
    transaction_date = Column(DateTime)
    description = Column(String(255))
    user = relationship("User", back_populates="transactions")
