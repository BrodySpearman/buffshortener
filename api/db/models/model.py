from pydantic import BaseModel
from datetime import datetime

class URLPost(BaseModel):
    inputUrl: str

class URLListRecord(BaseModel):
    inputUrl: str
    shortUrl: str

class db_url(BaseModel):
    longUrl: str
    shortUrl: str
    createdAt: datetime
