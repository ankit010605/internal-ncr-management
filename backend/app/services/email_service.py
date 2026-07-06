from flask_mail import Message
from app import mail


def send_ncr_email(to_email, subject, body):

    msg = Message(
        subject=subject,
        sender="your_email@gmail.com",
        recipients=[to_email]
    )

    msg.body = body

    mail.send(msg)