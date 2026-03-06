import uuid
from beanie import PydanticObjectId
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers
from api.auth.models.userModels import User, get_user_db
from dotenv import load_dotenv
import os


load_dotenv()
SECRET = os.getenv("VERIFICATION_KEY")

if (not SECRET):
    SECRET = os.environ.get("VERIFICATION_KEY")

class UserManager(BaseUserManager[User, PydanticObjectId]):
    verification_token_secret = SECRET
    reset_password_token_secret = SECRET

    async def on_after_register(self, user: User, request: Request | None=None):
        print(f"User {user.id} has registered.")
        print(f'User Email: {user.email}')
        
        session_id = None
        if request: session_id = request.cookies.get("session_id")
        from api.index import app

        # Existing URL migration
        if session_id:
            print(f"Migrating existing URL data from anonymous session {session_id} to user {user.id}...")
            await app.collection.update_many(
                {"owner.session_id": session_id},
                {"$set": {"owner.user_id": str(user.id), "owner.session_id": None}}
            )
            print("Migration complete.")

        

    async def on_after_forgot_password(
        self, user: User, token: str, request: Request | None=None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, request: Request | None=None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")

async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)