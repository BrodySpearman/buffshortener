from pymongo.server_api import ServerApi
from pymongo import AsyncMongoClient
import os
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from fastapi import FastAPI
from beanie import init_beanie

from api.auth.models.userModels import User
from api.auth.auth_config import auth_backend, fastapi_users
from api.auth.schemas import UserRead, UserCreate


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_client(app)
    yield
    await close_db_client(app)

async def create_db_client(app):

    load_dotenv()
    uri = os.getenv("MONGODB_URI")
    if(not uri):
        uri = os.environ.get("MONGODB_URI")

    app.client = AsyncMongoClient(uri, server_api=ServerApi(version="1", deprecation_errors=True))
    app.database = app.client.get_database("url_storage")
    app.collection = app.database.get_collection("urls")

    ### User database adapter connection ###
    await init_beanie(
        database=app.database,
        document_models=[User]
    )

    try:
        print("Successfully connected to MongoDB!")
    except Exception as e:
        print(e)

async def close_db_client(app):
    await app.client.close()
    print("Closed MongoDB connection")

app = FastAPI(docs_url="/api/docs", lifespan=lifespan)
print('Initialized FastAPI')

### Auth routers ###
app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/api/auth/jwt",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/api/auth",
    tags=["auth"],
)

import api.routes

