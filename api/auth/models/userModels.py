from fastapi_users.db import BeanieBaseUser, BeanieUserDatabase
from pydantic import Field
from beanie import Document

class User(BeanieBaseUser, Document):
    pass

async def get_user_db():
    yield BeanieBaseUser(User)