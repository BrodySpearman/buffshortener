from pydantic import BaseModel
from datetime import datetime

class URLPost(BaseModel):
    inputUrl: str

class URLDelete(BaseModel):
    shortUrl: str

class URLListRecord(BaseModel):
    inputUrl: str
    shortUrl: str

class db_url(BaseModel):
    longUrl: str
    shortUrl: str
    createdAt: datetime

class URLRedirect(BaseModel):
    longUrl: str

