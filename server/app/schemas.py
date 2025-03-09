from typing import List, Optional
from pydantic import BaseModel


class User(BaseModel):
    full_name: str
    email: str
    password: str


class LoginUser(BaseModel):
    email: str
    password: str


class CreateUser(BaseModel):
    full_name: str
    email: str

    class Config:
        from_attributes = True
