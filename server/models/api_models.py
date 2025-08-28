from pydantic import BaseModel, Field

class AuthRequest(BaseModel):
    user_login: str
    provided_password: str

class TokenRequest(BaseModel):
    role: str
    password: str
    minutes: int

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

class EmailRequest(BaseModel):
    subject: str
    recipients: list[str]
    message_html: str
    bcc: list[str] = Field(default_factory=list[str])

class JWT(BaseModel):
    ID: int
    name: str
    role: str
    login: str
    iat: int
    exp: int

