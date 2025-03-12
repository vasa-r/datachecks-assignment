from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
import schemas
import repository.blog as blog_repo
from database import get_db
import jwtToken
from typing import List

router = APIRouter(
    prefix="/blog",
    tags=["Blogs"],
    dependencies=[Depends(jwtToken.get_current_user)],
)


@router.post(
    "/", response_model=schemas.CreateBlogRes, status_code=status.HTTP_201_CREATED
)
def create_blog(
    request: schemas.CreateBlogReq,
    db: Session = Depends(get_db),
    user_id: str = Depends(jwtToken.get_current_user),
):

    return blog_repo.create(request, db, user_id)


@router.get(
    "/all", response_model=schemas.AllBlogLimitRes, status_code=status.HTTP_200_OK
)
def get_blogs(
    db: Session = Depends(get_db),
    skip: int = Query(0),
    limit: int = Query(10),
):
    return blog_repo.get_all_blogs(db, skip, limit)


@router.get(
    "/user-blogs",
    response_model=List[schemas.CreateBlogRes],
    status_code=status.HTTP_200_OK,
)
def get_blogs(
    db: Session = Depends(get_db),
    user_id=Depends(jwtToken.get_current_user),
    skip: int = Query(0),
    limit: int = Query(10),
):
    return blog_repo.get_user_blogs(db, user_id, skip, limit)


@router.get(
    "/{blog_id}", response_model=schemas.CreateBlogRes, status_code=status.HTTP_200_OK
)
def get_blog(blog_id: str, db: Session = Depends(get_db)):
    """Get a single blog by ID (protected route)."""
    return blog_repo.get_by_id(blog_id, db)


@router.delete("/{blog_id}", status_code=status.HTTP_200_OK)
def delete_blog(
    blog_id: str,
    db: Session = Depends(get_db),
    user_id: str = Depends(jwtToken.get_current_user),
):
    """Delete a blog (protected, only the owner can delete)."""
    return blog_repo.delete_blog(blog_id, db, user_id)


@router.patch("/{blog_id}", status_code=status.HTTP_200_OK)
def update_blog(
    blog_id: str,
    update_data: dict,
    db: Session = Depends(get_db),
    user_id: str = Depends(jwtToken.get_current_user),
):
    """Update a blog (protected, only the owner can update)."""
    return blog_repo.update_blog(blog_id, db, user_id, update_data)
