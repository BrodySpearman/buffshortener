from pydantic import BaseModel, HttpUrl, ValidationError
from datetime import datetime

class URLPost(BaseModel):
    inputUrl: HttpUrl

class URLDelete(BaseModel):
    shortUrl: str

class URLListRecord(BaseModel):
    inputUrl: HttpUrl
    shortUrl: str

# Every non-basic type needs string conversion when being inserted into the database
class db_url(BaseModel):
    longUrl: str
    shortUrl: str
    createdAt: datetime
    owner: dict

class URLRedirect(BaseModel):
    longUrl: str
