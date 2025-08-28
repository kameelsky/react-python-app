from api.tools.functions import send_email
from models.api_models import JWT, EmailRequest
from fastapi import APIRouter, Body, Depends, HTTPException, status
from functions.encryption import authentication

router = APIRouter(dependencies=[Depends(authentication)])

@router.post("/send-email")
def send_email(body: EmailRequest = Body(default=None), token: JWT = Depends(authentication)):

    token = JWT(**token)
    if token.role != "admin":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You need admin priviliges.")

    send_email(subject=body.subject,
                recipients=body.recipients,
                message_html=body.message_html,
                bcc=body.bcc)
    
    return "Email was sent successfully."