import os
from typing import Optional, Tuple

from loguru import logger
from sqlalchemy import CheckConstraint
from sqlmodel import Field, Relationship, Session, SQLModel, create_engine, select


class AuthorizationError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

# TABLES, ENGINE, DATABASE
class Users(SQLModel, table=True):
    ID: Optional[int] = Field(default=None, primary_key=True)
    Name: str = Field(max_length=100)
    Surname: str = Field(max_length=100)
    Email: str = Field(max_length=100, unique=True)
    Login: str = Field(max_length=100, unique=True)
    Password: str = Field(max_length=100)
    react_app: "ReactApp" = Relationship(back_populates="user", sa_relationship_kwargs={"cascade": "all, delete-orphan","uselist": False})

    def info(self): return {"ID": self.ID, "Name": self.Name, "Surname": self.Surname, "Email": self.Email, "Login": self.Login}

class ReactApp(SQLModel, table=True):
    ID: int = Field(foreign_key="users.ID", primary_key=True)
    Role: str = Field(max_length=100)
    Surname: str = Field(max_length=100)
    user: Users = Relationship(back_populates="react_app")

    __table_args__ = (
        CheckConstraint("Role IN ('admin', 'user')", name="check_role"),
    )

ENGINE = create_engine("sqlite:///database.db", connect_args={"check_same_thread": False})

if not os.path.exists("database.db"):
    SQLModel.metadata.create_all(ENGINE)
    logger.info("Database was created, since it was not detected.")
else:
    logger.success("Database was detected.")

# FUNCTIONS
def check_password(user_login: str, encrypted_provided_password: str) -> Optional[Tuple[str, str]]:
    with Session(ENGINE) as session:
        statement = select(Users).where(Users.Login == user_login).join(Users.react_app)
        user = session.exec(statement).first()
        if user is None: raise AuthorizationError("Login not found in database. Please register.")
        if user.Password != encrypted_provided_password: raise AuthorizationError("Incorrect password.")
        return user.Name, user.react_app.Role