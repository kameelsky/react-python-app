import os

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, status, Body
from functions.encryption import encryptJWT
from models.api_models import TokenRequest

router = APIRouter()

@router.post("/token")
def token(body: TokenRequest = Body()):
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))
    SECRET_KEY = os.getenv("SECRET_KEY")
    payload = {"ID": 0, "name": "Developer", "role": f"{body.role}", "login": "DEVE", "minutes": body.minutes}
    if body.password == SECRET_KEY: return encryptJWT(**payload)
    else: raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)