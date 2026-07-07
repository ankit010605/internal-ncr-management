import resend
from flask import current_app


def send_ncr_email(to_email, subject, body):

    try:

        resend.api_key = current_app.config["RESEND_API_KEY"]

        response = resend.Emails.send({

            "from": "Internal NCR Management System <onboarding@resend.dev>",

            "to": [to_email],

            "subject": subject,

            "text": body

        })

        print("=" * 60)
        print("EMAIL SENT SUCCESSFULLY")
        print(response)
        print("=" * 60)

        return response

    except Exception as e:

        print("=" * 60)
        print("EMAIL FAILED")
        print(type(e))
        print(e)
        print("=" * 60)

        raise