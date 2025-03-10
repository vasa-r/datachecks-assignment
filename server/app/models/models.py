import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from database import Base
from sqlalchemy.orm import relationship
from datetime import datetime, UTC


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    blogs = relationship("Blog", back_populates="owner")


class Blog(Base):
    __tablename__ = "blogs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title = Column(String, nullable=False)
    subtitle = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    content = Column(String, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        default=datetime.now(UTC),
    )

    owner = relationship("User", back_populates="blogs")
