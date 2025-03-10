import jwt
import os
from dotenv import load_dotenv
from uuid import UUID
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


load_dotenv()


JWT_SECRET = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"

security = HTTPBearer()


def create_access_token(data: dict):

    for key, value in data.items():
        if isinstance(value, UUID):
            data[key] = str(value)

    return jwt.encode(data, JWT_SECRET, algorithm=ALGORITHM)


def decode_jwt(token: str):
    """Decode JWT token and extract user ID."""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        return payload.get("id")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


def get_current_user(token: HTTPAuthorizationCredentials = Security(security)):
    """Extract and return the user ID from JWT token."""
    return decode_jwt(token.credentials)
