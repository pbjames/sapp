# init_db.py
from database import engine
import models  # Import your models to ensure they are registered

# Create all tables in the database
models.Base.metadata.create_all(bind=engine)

print("Database initialized successfully.")