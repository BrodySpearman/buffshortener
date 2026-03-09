from fastapi import APIRouter
from api.auth.auth_config import auth_backend, fastapi_users
from api.auth.schemas import UserRead, UserCreate, UserUpdate

auth_router = APIRouter()

auth_router.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/jwt",
)

auth_router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
)

auth_router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/verify"
)

auth_router.include_router(
    fastapi_users.get_users_router(UserRead, UserCreate),
    prefix="/users",
    tags=["users"]
)
