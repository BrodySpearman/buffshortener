from fastapi import FastAPI
from api.db.connect import create_db_client
from pydantic import BaseModel

# Helpful developer tools
# uvicorn api.index:app --reload ->
# http://localhost:8000/api/docs -- API documentation

class URLList(BaseModel):
    inputUrl: str
    shortUrl: str

class URLPost(BaseModel):
    inputUrl: str

URL_LIST = [
    URLList(inputUrl='https://www.youtube.com', shortUrl='buff.ly/123456'),
    URLList(inputUrl='https://www.google.com', shortUrl='buff.ly/123456'),
    URLList(inputUrl='https://www.openai.com', shortUrl='buff.ly/123456'),
]

app = FastAPI(docs_url="/api/py/docs")

@app.get("/api/py/show-url-list")
async def read_category_by_query():
    print("URL List:", URL_LIST)
    return URL_LIST

@app.post("/api/py/submit-url")
async def submit_url(url: URLPost):
    print(f"Input URL: {url.inputUrl}")
    return {'message': 'URL submitted successfully'}