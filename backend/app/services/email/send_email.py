from flask_mail import Message
from app import mail


def send_email(subject, recipients, body=None, html=None):

    print("INSIDE SEND EMAIL")

    # TEMPORARY
    return

    msg = Message(
        subject=subject,
        recipients=recipients
    )

    if body:
        msg.body = body

    if html:
        msg.html = html

    mail.send(msg)