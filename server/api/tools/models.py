from pydantic import BaseModel, Field

class EmailRequest(BaseModel):
    subject: str
    recipients: list[str]
    message_html: str
    bcc: list[str] = Field(default_factory=list[str])