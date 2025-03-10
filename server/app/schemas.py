from pydantic import BaseModel
from uuid import UUID
from typing import Optional
from datetime import datetime, UTC


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


class CreateBlogReq(BaseModel):
    title: str
    subtitle: str
    image_url: str
    content: str

    class Config:
        from_attributes = True


class CreateBlogRes(BaseModel):
    id: UUID
    title: str
    subtitle: str
    image_url: str
    content: str
    user_id: UUID
    creator: CreateUser
    created_at: datetime | None = None

    class Config:
        from_attributes = True
        json_encoders = {datetime: lambda v: v.astimezone(UTC).isoformat()}


class Blog(BaseModel):
    title: str
    subtitle: str
    image_url: str
    content: str
    user_id: UUID
    creator: CreateUser
    created_at: datetime | None = None

    class Config:
        from_attributes = True
        json_encoders = {datetime: lambda v: v.astimezone(UTC).isoformat()}


class UpdateBlog(BaseModel):
    title: Optional[str]
    subtitle: Optional[str]
    image_url: Optional[str]
    content: Optional[str]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
