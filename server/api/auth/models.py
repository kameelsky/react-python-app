from pydantic import BaseModel

class AuthRequest(BaseModel):
    user_login: str
    provided_password: str

class AuthResponse(BaseModel):
    ID: int
    name: str
    role: str
    login: str

class RegisterRequest(BaseModel):
    user_name: str
    user_surname: str
    user_email: str
    user_login: str
    user_password: str