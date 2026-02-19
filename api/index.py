from fastapi import FastAPI
from api.db.connect import create_db_client

# Helpful developer tools
# uvicorn api.index:app --reload ->
# http://localhost:8000/api/docs -- API documentation

URL_LIST = [
    {'inputUrl': 'https://www.youtube.com', 'shortUrl': 'buff.ly/123456'},
    {'inputUrl': 'https://www.google.com', 'shortUrl': 'buff.ly/123456'},
    {'inputUrl': 'https://www.openai.com', 'shortUrl': 'buff.ly/123456'},
]

ENGINEER_ROLES = [
    {'title': 'Frontend Developer', 'mainskill': 'React'},
    {'title': 'Backend Developer', 'mainskill': 'Node.js'},
    {'title': 'Fullstack Developer', 'mainskill': 'Next.js'},
    {'title': 'Machine Learning Engineer', 'mainskill': 'Tensorflow'},
    {'title': 'Data Scientist', 'mainskill': 'Apache Spark'},
    {'title': 'Software Architect', 'mainskill': 'System Analysis'},
]

app = FastAPI(docs_url="/api/py/docs")

@app.get("/api/py/show-url-list")
async def read_category_by_query():
    url_to_return = None
    for url in URL_LIST:
        return url