from fastapi_users.authentication import AuthenticationBackend, BearerTransport, JWTStrategy
from fastapi_users import FastAPIUsers
from api.auth.models.userModels import User
from beanie import PydanticObjectId
from api.auth.manager import get_user_manager
from dotenv import load_dotenv
import uuid
import os

bearer_transport = BearerTransport(tokenUrl="api/auth/jwt/login")

load_dotenv()
SECRET = os.getenv('BEAR_TOKEN')
if (not SECRET):
    SECRET = os.environ.get('BEAR_TOKEN')

def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=60*60*24)

auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, PydanticObjectId](
    get_user_manager,
    [auth_backend],
)

current_active_user = fastapi_users.current_user(active=True)
current_optional_user = fastapi_users.current_user(active=True, optional=True)

