from api.tools.functions import send_email
from api.tools.models import EmailRequest
from fastapi import APIRouter, Body, Depends
from functions.encryption import authentication

router = APIRouter(dependencies=[Depends(authentication)])

@router.post("/send_email")
async def bot_send_email(body: EmailRequest = Body(default=None)):

    send_email(subject=body.subject,
                recipients=body.recipients,
                message_html=body.message_html,
                bcc=body.bcc)
    
    return "Email was sent successfully."

@router.get("/test")
def test(token = Depends(authentication)):
    return token