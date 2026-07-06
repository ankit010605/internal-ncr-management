from app.services.email.send_email import send_email


def send_ncr_created_email(recipient):

    subject = "Internal NCR Created"

    body = """
Hello,

A new Internal NCR has been created.

Please login to the NCR Portal.

Regards,
Quality Department
"""

    send_email(
        subject,
        [recipient],
        body
    )