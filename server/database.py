from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# DATABASE_LOCAL_URL = "postgresql://postgres:1q2w3e4r@localhost:5432/crypto"
DATABASE_REMOTE_URL = "postgresql://mycryptodb_user:b8TJYjiDyYoPXKUcav3PuhNe7OGmXyfr@dpg-d0ukr7umcj7s739rbuo0-a.oregon-postgres.render.com/mycryptodb"

# engine = create_engine(DATABASE_LOCAL_URL)
engine = create_engine(DATABASE_REMOTE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
