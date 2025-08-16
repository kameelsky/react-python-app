from api.auth.models import AuthRequest, AuthResponse, RegisterRequest
from data import ENGINE, ReactApp, Users, check_access, AuthorizationError
from fastapi import APIRouter, Body, HTTPException, Query, status
from sqlalchemy.exc import IntegrityError, OperationalError
from sqlmodel import Session

router = APIRouter()

@router.post("/user-validate", response_model=AuthResponse)
def validate_user(developer: bool = Query(default=False), body: AuthRequest = Body()):
    if developer == True: return {"ID": 0, "name": "Developer", "role": "admin", "login": "DEVE"}
    try:
        id, name, role = check_access(user_login=body.user_login, encrypted_provided_password=body.provided_password)
        return {"ID": id, "name": name, "role": role, "login": body.user_login}
    except IntegrityError: raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A resource conflict occurred.")
    except OperationalError: raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="No database found. Contact IT support.")
    except AuthorizationError as error_message: raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(error_message))

@router.put("/register")
def register_new_user(body: RegisterRequest = Body()):
    try:
        with Session(ENGINE) as session:
            new_user = Users(
                Name=body.user_name,
                Surname=body.user_surname,
                Email=body.user_email,
                Login=body.user_login,
                Password=body.user_password,
                react_app=ReactApp(
                    Role='user', 
                    Surname=body.user_surname
                )
            )
            session.add(new_user)
            session.commit()
            session.refresh(new_user)
            return {"user": new_user.info()}
    except IntegrityError: raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A resource conflict occurred. Login or Email already exists in the database.")
    except OperationalError: raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="No database found. Contact IT support.")