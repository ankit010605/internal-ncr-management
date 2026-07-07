from app.api import api
from app.services.email.send_email import send_email


@api.get("/test-email")
def test_email():

    try:

        send_email(
            subject="Brevo Test Email",
            recipients=["snehasuman4004@gmail.com"],
            body="This is a test email from Brevo.",
            html="""
            <h2>✅ Brevo is Working!</h2>
            <p>This email was sent successfully from your Internal NCR Management System.</p>
            """
        )

        return {
            "success": True,
            "message": "Email sent successfully."
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }, 500