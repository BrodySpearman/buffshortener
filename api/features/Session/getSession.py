from fastapi import Cookie, Depends, HTTPException

async def get_session(session_id: str = Cookie(default=None)):
    if not session_id:
        raise HTTPException(status_code=401, detail="No session ID found")
    return session_id