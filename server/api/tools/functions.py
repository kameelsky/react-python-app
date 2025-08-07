from email.mime.text import MIMEText
from smtplib import SMTP_SSL, SMTPException

from fastapi import HTTPException, status
from loguru import logger


def send_email(subject: str, message_html: str, recipients: list, bcc: list) -> None:

    PASSWORD = "password"
    SENDER = "sender@gmail.com"
    msg = MIMEText(message_html, 'html')
    msg['Subject'] = subject
    msg['From'] = SENDER
    msg['To'] = ', '.join([x for x in recipients if x not in bcc])

    with SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
        try:
            smtp_server.login(SENDER, PASSWORD)
            smtp_server.sendmail(SENDER, recipients + bcc, msg.as_string())
        except SMTPException as error:
            logger.error("SMTP error occured.")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SMTP error occured.")

