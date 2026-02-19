from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os

def create_db_client():
    uri = os.getenv("MONGODB_URI")

    # Client Creation
    client = MongoClient(uri, server_api=ServerApi('1'))
    # Ping
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)