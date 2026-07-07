from app.api import api
from app.services.email.send_email import send_email


@api.get("/test-email")
def test_email():

    try:

        response = send_email(
            subject="Resend Test",
            recipients=["goodone2627@gmail.com"],   # your email
            body="This is a Resend test email."
        )

        return {
            "success": True,
            "response": response
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }, 500