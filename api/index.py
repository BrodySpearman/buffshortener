from pymongo.server_api import ServerApi
from pymongo import AsyncMongoClient
import os
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from fastapi import FastAPI

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

    try:
        print("Successfully connected to MongoDB!")

    except Exception as e:
        print(e)

async def close_db_client(app):
    await app.client.close()
    print("Closed MongoDB connection")

app = FastAPI(docs_url="/api/docs", lifespan=lifespan)
print('Initialized FastAPI')
import api.routes

