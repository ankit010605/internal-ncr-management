from datetime import datetime

from app.models.internal_ncr import InternalNCR
from app.repositories.ncr.update_ncr_repository import update_ncr

from app.services.email.send_email import send_email
from app.services.email.templates import ncr_closed_template


def close_ncr(ncr_id, data):

    ncr = InternalNCR.query.get(ncr_id)

    if not ncr:
        return None

    # -----------------------------
    # Update Closure Details
    # -----------------------------

    ncr.closed_by = data.get("closed_by")

    ncr.closed_date = datetime.utcnow()

    ncr.root_cause_analysis = data.get(
        "root_cause_analysis"
    )

    ncr.corrective_preventive_action = data.get(
        "corrective_preventive_action"
    )

    ncr.status = "Closed"

    update_ncr(ncr)

    # ---------------------------------
    # Email Recipients
    # ---------------------------------

    recipients = []

    if ncr.production_incharge_email:
        recipients.append(ncr.production_incharge_email)

    if ncr.quality_incharge_email:
        recipients.append(ncr.quality_incharge_email)

    if ncr.responsible_email:
        recipients.append(ncr.responsible_email)
    if ncr.initiator_email:
        recipients.append(ncr.initiator_email)

# Remove duplicate emails
  

    recipients = list(set(recipients))

    # ---------------------------------
    # HTML Email
    # ---------------------------------

    image_urls = [
        attachment.image_url
        for attachment in ncr.attachments
    ]

    html = ncr_closed_template(
        ncr=ncr,
        image_urls=image_urls
    )

    body = f"""
Internal NCR Closed

NCR Number : {ncr.ncr_number}

Project : {ncr.project_name}

Closed By : {ncr.closed_by}

Please view the HTML version of this email for complete details.
"""

    if recipients:

        try:

            send_email(
                subject=f"🟢 Internal NCR Closed | {ncr.ncr_number}",
                recipients=recipients,
                body=body,
                html=html
            )

            print("=" * 60)
            print("✅ NCR CLOSED EMAIL SENT")
            print("=" * 60)

        except Exception as e:

            print("=" * 60)
            print("❌ FAILED TO SEND CLOSED EMAIL")
            print(e)
            print("=" * 60)

    return ncr