import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from uuid import UUID


load_dotenv()


JWT_SECRET = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"


def create_access_token(data: dict):

    for key, value in data.items():
        if isinstance(value, UUID):
            data[key] = str(value)

    return jwt.encode(data, JWT_SECRET, algorithm=ALGORITHM)
