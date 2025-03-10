from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models import models
import schemas
from fastapi import HTTPException, status
from hashing import Hash
import jwtToken


def create(request: schemas.User, db: Session):

    existing_user = (
        db.query(models.User).filter(models.User.email == request.email).first()
    )
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already in use")

    try:

        if not request.full_name or not request.email or not request.password:
            raise HTTPException(status_code=400, detail="All fields are required")

        new_user = models.User(
            full_name=request.full_name,
            email=request.email.lower(),
            password=Hash.hash(request.password),
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Database integrity error. Possible duplicate entry.",
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}"
        )


def login(request: schemas.LoginUser, db: Session):

    if not request.email or not request.password:
        raise HTTPException(status_code=400, detail="All fields are required")

    user = db.query(models.User).filter(models.User.email == request.email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid credentials"
        )

    if not Hash.verify(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    access_token = jwtToken.create_access_token(data={"sub": user.email, "id": user.id})

    return {
        "token": access_token,
        "userData": {
            "userName": user.full_name,
            "email": user.email,
        },
    }
