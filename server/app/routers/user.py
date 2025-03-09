from fastapi import APIRouter
import database
import schemas
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status
from repository import user

router = APIRouter(prefix="/user", tags=["Users"])

get_db = database.get_db


@router.post(
    "/signup", response_model=schemas.CreateUser, status_code=status.HTTP_201_CREATED
)
def create_user(request: schemas.User, db: Session = Depends(get_db)):
    return user.create(request, db)


@router.post("/signin")
def login_user(request: schemas.LoginUser, db: Session = Depends(get_db)):
    print(request)
    return user.login(request, db)
