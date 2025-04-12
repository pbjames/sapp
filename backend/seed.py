import os
from sqlalchemy import create_engine, Column, Integer, String, TIMESTAMP, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Define the base class for declarative models
Base = declarative_base()

# Define the User model to match your CREATE TABLE statement
class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(60), nullable=False)
    wallet_address = Column(String(50), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())  # Defaults to current time

# Retrieve your connection string from an environment variable or set it directly
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://username:password@host:port/dbname?sslmode=require"
)

# Create the engine using your connection string
engine = create_engine(DATABASE_URL)

# Create all tables in the database which do not yet exist
Base.metadata.create_all(engine)

# (Optional) Create a session to insert seed data if needed
Session = sessionmaker(bind=engine)
session = Session()

# Optional: Seed a default user (comment out if not required)
new_user = User(username="exampleuser", password_hash="hashed_password", wallet_address="abc123")
session.add(new_user)
try:
    session.commit()
    print("Seeded new user successfully!")
except Exception as e:
    session.rollback()
    print("Error occurred while seeding:", e)
finally:
    session.close()

print("Database seeding complete!")
