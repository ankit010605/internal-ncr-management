from flask_mail import Message
from app import mail


def send_email(subject, recipients, body=None, html=None):

    try:
        print("INSIDE SEND EMAIL")

        msg = Message(
            subject=subject,
            recipients=recipients
        )

        if body:
            msg.body = body

        if html:
            msg.html = html

        mail.send(msg)

        print("EMAIL SENT SUCCESSFULLY")

    except Exception as e:
        print("EMAIL ERROR:", e)