from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from models import models
import schemas
from fastapi import HTTPException, status
from uuid import UUID


def create(req: schemas.CreateBlogReq, db: Session, user_id: str):

    try:
        new_blog = models.Blog(
            title=req.title,
            subtitle=req.subtitle,
            image_url=req.image_url,
            content=req.content,
            user_id=user_id,
        )
        db.add(new_blog)
        db.commit()
        db.refresh(new_blog)

        creator = db.query(models.User).filter(models.User.id == UUID(user_id)).first()

        return schemas.CreateBlogRes(
            id=new_blog.id,
            title=new_blog.title,
            subtitle=new_blog.subtitle,
            image_url=new_blog.image_url,
            content=new_blog.content,
            user_id=new_blog.user_id,
            created_at=new_blog.created_at,
            creator=(
                schemas.CreateUser(full_name=creator.full_name, email=creator.email)
                if creator
                else None
            ),
        )

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Integrity error: Could not create blog. Ensure the user exists.",
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {str(e)}",
        )


def get_all_blogs(db: Session):

    try:
        blogs = db.query(models.Blog).all()

        if not blogs:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No blogs found.",
            )

        return [
            schemas.CreateBlogRes(
                id=blog.id,
                title=blog.title,
                subtitle=blog.subtitle,
                image_url=blog.image_url,
                content=blog.content,
                user_id=blog.user_id,
                created_at=blog.created_at,
                creator=(
                    schemas.CreateUser(
                        full_name=blog.owner.full_name, email=blog.owner.email
                    )
                    if blog.owner
                    else None
                ),
            )
            for blog in blogs
        ]

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {str(e)}",
        )


def get_by_id(blog_id: str, db: Session):

    try:
        blog = db.query(models.Blog).filter(models.Blog.id == UUID(blog_id)).first()

        if not blog:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found."
            )

        return schemas.CreateBlogRes(
            id=blog.id,
            title=blog.title,
            subtitle=blog.subtitle,
            image_url=blog.image_url,
            content=blog.content,
            user_id=blog.user_id,
            created_at=blog.created_at,
            creator=(
                schemas.CreateUser(
                    full_name=blog.owner.full_name, email=blog.owner.email
                )
                if blog.owner
                else None
            ),
        )

    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error occurred: {str(e)}",
        )


def get_user_blogs(db: Session, user_id: str):
    """Fetch all blogs for a specific user with proper error handling."""
    try:
        blogs = db.query(models.Blog).filter(models.Blog.user_id == UUID(user_id)).all()

        if not blogs:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No blogs found for this user.",
            )

        return [
            schemas.CreateBlogRes(
                id=blog.id,
                title=blog.title,
                subtitle=blog.subtitle,
                image_url=blog.image_url,
                content=blog.content,
                user_id=blog.user_id,
                created_at=blog.created_at,
                creator=(
                    schemas.CreateUser(
                        full_name=blog.owner.full_name, email=blog.owner.email
                    )
                    if blog.owner
                    else None
                ),
            )
            for blog in blogs
        ]

    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error occurred: {str(e)}",
        )


def delete_blog(blog_id: str, db: Session, user_id: str):
    """Delete a blog by ID (only if the user is the owner) with proper error handling."""
    try:
        blog = db.query(models.Blog).filter(models.Blog.id == UUID(blog_id)).first()

        if not blog:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found."
            )

        if str(blog.user_id) != str(user_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to delete this blog.",
            )

        db.delete(blog)
        db.commit()

        return {"message": "Blog deleted successfully."}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error occurred: {str(e)}",
        )


def update_blog(blog_id: str, db: Session, user_id: str, update_data: dict):
    """Update a blog by ID (only if the user is the owner) with proper error handling."""
    try:
        blog = db.query(models.Blog).filter(models.Blog.id == UUID(blog_id)).first()

        if not blog:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found."
            )

        if str(blog.user_id) != str(user_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to update this blog.",
            )

        for key, value in update_data.items():
            if hasattr(blog, key):
                setattr(blog, key, value)

        db.commit()
        db.refresh(blog)

        return {"message": "Blog updated successfully.", "updated_blog": blog}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error occurred: {str(e)}",
        )
