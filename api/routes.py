from api.index import app, create_db_client, close_db_client
from pydantic import BaseModel
from api.features.shortenUrl import generate_new_url
from api.db.models.model import db_url, URLPost, URLListRecord
from datetime import datetime

# Helpful developer tools
# uvicorn api.index:app --reload ->
# http://localhost:8000/api/docs -- API documentation
# Database models are stored in api/db/models/model.py

@app.get("/api/show-url-list")
async def show_url_list():
    """
        Fetches all past input URLs and corrosponding aliases.
        URL_LIST: object[]
        {
            "inputUrl": "https://www.youtube.com",
            "shortUrl": "buff.ly/123456"
        }
    """
    await create_db_client(app)
    url_list = []
    async for url in app.collection.find({}).limit(10): 
        url_list.append(URLListRecord(inputUrl=url['longUrl'], shortUrl=url['shortUrl']))

    print("URL List:", url_list)

    return url_list
   

@app.post("/api/submit-url")
async def submit_url(url: URLPost):
    """
        Submits a new URL to the database.
        URLPost: object
        {
            "inputUrl": "https://www.youtube.com"
        }
    """
    inputUrl = url.inputUrl
    await create_db_client(app)
    
    new_db_url = db_url(
        longUrl=inputUrl,
        shortUrl=generate_new_url(inputUrl),
        createdAt=datetime.now(),
    )

    await app.collection.insert_one({
        "longUrl": new_db_url.longUrl,
        "shortUrl": new_db_url.shortUrl,
        "createdAt": new_db_url.createdAt,
    })

    print("New Entry: (")
    print(f"Short URL: {new_db_url.shortUrl}")
    print(f"Input URL: {new_db_url.longUrl}")
    print(f"creation Date: {new_db_url.createdAt}")
    print(")")

    return {'message': 'URL submitted successfully', 'shortUrl': new_db_url.shortUrl}
    