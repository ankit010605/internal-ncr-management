import resend
from flask import current_app


def send_email(subject, recipients, body=None, html=None):

    try:

        resend.api_key = current_app.config["RESEND_API_KEY"]

        params = {
            "from": "Internal NCR Management System <onboarding@resend.dev>",
            "to": recipients,
            "subject": subject,
            "html": html if html else body
        }

        response = resend.Emails.send(params)

        print("=" * 60)
        print("EMAIL SENT SUCCESSFULLY")
        print(response)
        print("=" * 60)

        return response

    except Exception as e:

        print("=" * 60)
        print("EMAIL FAILED")
        print(e)
        print("=" * 60)

        raise