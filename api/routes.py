from api.index import app
from pydantic import BaseModel
from api.features.shortenUrl import generate_new_url
from api.db.models.model import db_url, URLPost, URLListRecord, URLDelete, URLRedirect
from api.auth.models.userModels import User
from api.auth.auth_config import current_active_user, current_optional_user
from datetime import datetime
from fastapi import Response, Depends, Cookie
from fastapi.responses import RedirectResponse
import uuid
from api.features.Session.getSession import get_session
from typing import Optional

# Helpful developer tools
# uvicorn api.index:app --reload ->
# http://localhost:8000/api/docs -- API documentation
# Database models are stored in api/db/models/model.py

# Small helper function for user checking.
def get_owner_query(session_id: str, user: Optional[User] = None) -> dict:
    if user:
        return {"owner.user_id": str(user.id)}
    else:
        return{"owner.session_id": session_id}
        
### Routes ###

"""
    Redirects from short URL to Long URL.
    URLRedirect: object
    {
        "shortUrl": "buff.st/123456",
        "longUrl": "https://www.youtube.com"
    }
"""
@app.get("/buff.st/{shortUrl}")
async def redirect_url(shortUrl: str):
    url = await app.collection.find_one({ "shortUrl": f"buff.st/{shortUrl}" })
    if url:
        print("Redirecting to: ")
        print(url["longUrl"])
        return RedirectResponse(url["longUrl"])
    return {'message': 'URL not found'}

"""
    Creates a new anonymous (non-logged in) session.
    ANONYMOUS_SESSION: object
    {
        "sessionId": "123456"
    }
"""
@app.get("/api/sessions/anonymous")
async def create_anonymous_session(response: Response):
    session_id = str(uuid.uuid4())

    response.set_cookie(
        key="session_id",
        value=session_id,
        httponly=True,
        samesite="lax",
        max_age=60*60*24*7,
        secure=False
    )

    print(f'New session created: {session_id}')
    return {'sessionId': session_id}

"""
    Fetches all user (or anon session) input URLs and corrosponding aliases.
    URL_LIST: object[]
    {
        "inputUrl": "https://www.youtube.com",
        "shortUrl": "buff.st/123456"
    }
"""
@app.get("/api/show-url-list")
async def show_url_list(
    session_id: str = Depends(get_session),
    user: Optional[User] = Depends(current_optional_user)
):
    query = get_owner_query(session_id, user)
    url_list = []

    async for url in app.collection.find(query).sort({"createdAt": -1}).limit(10): 
        url_list.append(URLListRecord(inputUrl=url['longUrl'], shortUrl=url['shortUrl']))

    return url_list

"""
    Submits a new URL to the database.
    URLPost: object
    {
        "inputUrl": "https://www.youtube.com"
    }
"""
@app.post("/api/submit-url")
async def submit_url(
    url: URLPost, 
    session_id: str = Depends(get_session), 
    user: Optional[User] = Depends(current_optional_user)
):
    inputUrl = str(url.inputUrl)
    
    existing_url = await app.collection.find_one({ 
        "longUrl": inputUrl,
        **get_owner_query(session_id, user)
         })

    if existing_url:
        return {'message': 'URL already exists for user'}

    new_db_url = db_url(
        longUrl=inputUrl,
        shortUrl=generate_new_url(inputUrl),
        createdAt=datetime.now(),
        owner={
            "session_id": session_id,
            "user_id": str(user.id) if user else None
        }
    )

    try:
        await app.collection.insert_one(new_db_url.model_dump())

    except ValidationError as e:
        return {'message': 'Invalid URL'}

    # User limit check
    countCursor = await app.collection.count_documents(get_owner_query(session_id, user))
    if countCursor > 10:
        await app.collection.delete_one(get_owner_query(session_id, user))

    print("New Entry: (")
    print(f"Short URL: {new_db_url.shortUrl}")
    print(f"Input URL: {new_db_url.longUrl}")
    print(f"creation Date: {new_db_url.createdAt}")
    print(f"session-id: {new_db_url.owner['session_id']}")
    print(")")

    return {'message': 'URL submitted successfully', 'shortUrl': new_db_url.shortUrl}

"""
    Deletes a URL from the database.
    URLPost: object
    {
        "shortUrl": "buff.st/123456"
    }
"""
@app.delete("/api/delete-url")
async def delete_url(
    url: URLDelete, 
    session_id: str = Depends(get_session), 
    user: Optional[User] = Depends(current_optional_user)
):
    query = get_owner_query(session_id, user)
    await app.collection.delete_one({ "shortUrl": url.shortUrl, **query })
    print(f'Deleted url: {url.shortUrl}')
    print(f'ID: {query.values}')
    return {'message': 'URL deleted successfully'}
