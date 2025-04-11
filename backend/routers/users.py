# routers/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from database import get_db
from models import User
from pydantic import BaseModel

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserCreate(BaseModel):
    username: str
    password: str
    wallet_address: str

@router.post("/register/")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter((User.username == user.username) | (User.wallet_address == user.wallet_address)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or wallet address already registered")
    
    hashed_password = pwd_context.hash(user.password)
    new_user = User(username=user.username, password_hash=hashed_password, wallet_address=user.wallet_address)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"username": new_user.username, "wallet_address": new_user.wallet_address}

@router.get("/db-test")
def test_db_connection(db: Session = Depends(get_db)):
    """Test database connection and return success message"""
    try:
        db.execute("SELECT 1")
        return {"message": "Database connection successful!", "status": "success"}
    except Exception as e:
        return {"message": f"Database connection failed: {str(e)}", "status": "error"}