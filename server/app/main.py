from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from models import models
from database import engine
from routers import user, blog

load_dotenv()

models.Base.metadata.create_all(engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Health Check"])
def health_check():
    return {"success": True, "message": "API is working fine"}


app.include_router(user.router)
app.include_router(blog.router)
