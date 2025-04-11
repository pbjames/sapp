from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class User(Base):
    """
    User model for authentication and profile information
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(128), nullable=False)
    wallet_address = Column(String(42), unique=True, index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    

