import os
from datetime import datetime, timedelta
from typing import Optional

import jwt
from dotenv import load_dotenv
from fastapi import HTTPException, Request, status

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

def decryptJWT(token: str) -> Optional[dict]:
    try: return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.exceptions.DecodeError: raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Decoding error")
    except jwt.exceptions.ExpiredSignatureError: raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")

def encryptJWT(name: str, role: str, login: str) -> str:
    payload = {
        "name": name,
        "role": role,
        "login": login,
        "iat": int(datetime.now().timestamp()),
        "exp": int((datetime.now() + timedelta(minutes=30)).timestamp())
    }
    headers = {"alg": ALGORITHM}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM, headers=headers)

def authentication(request: Request) -> Optional[dict]:
    token = request.cookies.get("session")
    if not token: raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="JWT token not found in 'session' cookie")
    return decryptJWT(token=token)