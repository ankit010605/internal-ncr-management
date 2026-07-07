import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from flask import current_app


def send_email(subject, recipients, body=None, html=None):

    configuration = sib_api_v3_sdk.Configuration()

    configuration.api_key["api-key"] = current_app.config["BREVO_API_KEY"]

    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
        sib_api_v3_sdk.ApiClient(configuration)
    )

    sender = {
        "name": "Internal NCR Management System",
        "email": "snehasuman4004@gmail.com"
    }

    to = []

    for email in recipients:
        to.append({"email": email})

    email_data = sib_api_v3_sdk.SendSmtpEmail(
        sender=sender,
        to=to,
        subject=subject,
        html_content=html if html else body
    )

    try:

        response = api_instance.send_transac_email(email_data)

        print("=" * 60)
        print("EMAIL SENT SUCCESSFULLY")
        print(response)
        print("=" * 60)

    except ApiException as e:

        print("=" * 60)
        print("EMAIL FAILED")
        print(e)
        print("=" * 60)

        raise