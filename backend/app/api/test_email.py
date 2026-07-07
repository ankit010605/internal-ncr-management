from flask_mail import Message
from app import mail
from app.api import api


@api.route("/test-email", methods=["GET"])
def test_email():

    print("TEST EMAIL STARTED")

    msg = Message(
        subject="SMTP Test From Render",
        recipients=["goodone2627@gmail.com"]   # replace if needed
    )

    msg.body = "Hello! This email was sent from your Render deployment."

    try:
        mail.send(msg)

        print("EMAIL SENT SUCCESSFULLY")

        return {
            "success": True,
            "message": "Email sent successfully"
        }

    except Exception as e:

        print("EMAIL FAILED")
        print(e)

        return {
            "success": False,
            "error": str(e)
        }, 500