from api.db.connect import create_db_client
from pydantic import BaseModel
from api.db.connect import app
from api.db.models.model import URLPost
from api.features.shortenUrl import generate_new_url

# Helpful developer tools
# uvicorn api.index:app --reload ->
# http://localhost:8000/api/docs -- API documentation

class URLList(BaseModel):
    inputUrl: str
    shortUrl: str

URL_LIST = [
    URLList(inputUrl='https://www.youtube.com', shortUrl='buff.ly/123456'),
    URLList(inputUrl='https://www.google.com', shortUrl='buff.ly/123456'),
    URLList(inputUrl='https://www.twitch.tv', shortUrl='buff.ly/123456'),
]

@app.get("/api/py/show-url-list")
async def read_category_by_query():
    """
        Fetches all past input URLs and corrosponding aliases.
        URL_LIST: object[]
        {
            "inputUrl": "https://www.youtube.com",
            "shortUrl": "buff.ly/123456"
        }
    """
    dbClient = await create_db_client(app)
    print("URL List:", URL_LIST)
    return URL_LIST

@app.post("/api/py/submit-url")
async def submit_url(url: URLPost):
    """
        Submits a new URL to the database.
        URLPost: object
        {
            "inputUrl": "https://www.youtube.com"
        }
    """
    dbClient = await create_db_client(app)
    inputUrl = url.inputUrl

    shortUrl = generate_new_url(inputUrl)
    print(f"Short URL: {shortUrl}")
    print(f"Input URL: {inputUrl}")



    

    return {'message': 'URL submitted successfully'}