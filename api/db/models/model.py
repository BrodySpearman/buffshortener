from pydantic import BaseModel

class URLPost(BaseModel):
    inputUrl: str

class URLGet(BaseModel):
    inputUrl: str
    shortUrl: str