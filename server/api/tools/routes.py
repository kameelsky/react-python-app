from api.tools.functions import send_email
from api.tools.models import JWT, EmailRequest
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

@router.get("/jwt-test")
def test(token = Depends(authentication)):
    return token



from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use("Agg")
import io

class ChartData(BaseModel):
    x: list
    y: list
    title: str

@router.post("/chart")
def generate_chart(data: ChartData = Body()):
    # Create plot
    fig, ax = plt.subplots()
    ax.plot(data.x, data.y, marker='o')
    ax.set_title(data.title)
    ax.set_xlabel("X Axis")
    ax.set_ylabel("Y Axis")
    
    stream = io.BytesIO()
    plt.savefig(stream, format="png")
    stream.seek(0)
    plt.close(fig)

    return StreamingResponse(
        stream,
        media_type="image/png",
        headers={"Content-Disposition": "attachment; filename=chart.png"}
    )
