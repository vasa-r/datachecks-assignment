from fastapi import FastAPI
from dotenv import load_dotenv
from models import models
from database import engine
from routers import user

app = FastAPI()

models.Base.metadata.create_all(engine)


@app.get("/", tags=["Health Check"])
def health_check():
    return {"success": True, "message": "API is working fine"}


app.include_router(user.router)
