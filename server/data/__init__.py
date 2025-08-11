from typing import Optional, Tuple

from loguru import logger
from sqlalchemy import CheckConstraint, ForeignKey, Column, Integer
from sqlalchemy.exc import OperationalError
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
    react_app: "ReactApp" = Relationship(back_populates="user")

    def info(self): return {"ID": self.ID, "Name": self.Name, "Surname": self.Surname, "Email": self.Email, "Login": self.Login}

class ReactApp(SQLModel, table=True):
    ID: int = Field(
        sa_column=Column(
            Integer,
            ForeignKey("users.ID", ondelete="CASCADE"),
            primary_key=True
        )
    )
    Role: str = Field(max_length=100)
    Surname: str = Field(max_length=100)
    user: Users = Relationship(back_populates="react_app")

    __table_args__ = (
        CheckConstraint("Role IN ('admin', 'user')", name="check_role"),
    )

# MySQL sever configuration
DATABASE="applications"
USER="app_user"
PASSWORD="apppasswd"
HOST="localhost"
PORT="3306"

try:
    ENGINE = create_engine(f"mysql+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}", echo=False)
    SQLModel.metadata.create_all(ENGINE)
    print(f"\n***\nConnected MySQL server -> {USER}@{HOST}:{PORT}/{DATABASE}\n***\n")
except OperationalError as error: logger.error(error)

# FUNCTIONS
def check_access(user_login: str, encrypted_provided_password: str) -> Optional[Tuple[str, str]]:
    with Session(ENGINE) as session:
        id = session.exec(select(Users.ID).where(Users.Login == user_login)).first()
        if id is None: raise AuthorizationError("You are not found in the database. Please register.") 
        user = session.exec(select(Users).where(Users.ID == id).join(Users.react_app)).first()
        if user is None: raise AuthorizationError("You have no access to the application. Contact administrators to grant the access.")
        if user.Password != encrypted_provided_password: raise AuthorizationError("Incorrect password.")
        return user.Name, user.react_app.Role