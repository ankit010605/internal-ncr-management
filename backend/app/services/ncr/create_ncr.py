from app.models.internal_ncr import InternalNCR
from app.models.ncr_attachment import NCRAttachment

from app.repositories.ncr.create_ncr_repository import save_ncr
from app.repositories.plant_repository import get_plant_details

from app.utils.ncr_number import generate_ncr_number
from app.services.cloudinary_service import upload_to_cloudinary
from app.services.email.send_email import send_email
from app.services.email.templates import ncr_created_template
from app.database.db import db


def create_ncr(data, files):

    plant = get_plant_details(
        data["plant"],
        data.get("bay")
    )

    ncr = InternalNCR(

        ncr_number=generate_ncr_number(),

        project_name=data["project_name"],

        drawing_number=data.get("drawing_number"),
        mak_number=data.get("mak_number"),

        quantity=int(data["quantity"]) if data.get("quantity") else None,
 
        department=data.get("department"),

        contractor=data.get("contractor"),

        plant=data["plant"],

        bay=data.get("bay"),

        stage=data.get("stage"),

        production_incharge_name=plant.production_incharge_name if plant else None,

        production_incharge_email=plant.production_incharge_email if plant else None,

        quality_incharge_name=plant.quality_incharge_name if plant else None,

        quality_incharge_email=plant.quality_incharge_email if plant else None,

        initiator_name=data.get("initiator_name"),
        initiator_email=data.get("initiator_email"),
        closing_responsibility=data.get("closing_responsibility"),

        responsible_person=data.get("responsible_person"),

        responsible_email=data.get("responsible_email"),

        issue_date=data.get("issue_date"),

        target_closing_date=data.get("target_closing_date"),

        ncr_description=data["ncr_description"],

        root_cause_analysis=data.get("root_cause_analysis"),

        corrective_preventive_action=data.get("corrective_preventive_action")

    )

    # ---------------------------------
    # Save NCR
    # ---------------------------------

    ncr = save_ncr(ncr)

    print("=" * 60)
    print("Files received:", len(files))
    print("=" * 60)

    image_urls = []

    # ---------------------------------
    # Upload Images
    # ---------------------------------

    for file in files:

        if file and file.filename:

            print("Uploading:", file.filename)

            image_url = upload_to_cloudinary(file)

            image_urls.append(image_url)

            attachment = NCRAttachment(
                ncr_id=ncr.id,
                image_url=image_url
            )

            db.session.add(attachment)

    db.session.commit()

    # ---------------------------------
    # Prepare Email Recipients
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

    print("=" * 60)
    print("EMAIL RECIPIENTS")
    print(recipients)
    print("=" * 60)

    # ---------------------------------
    # Generate HTML Email
    # ---------------------------------

    html = ncr_created_template(
        ncr=ncr,
        image_urls=image_urls
    )

    # ---------------------------------
    # Plain Text Fallback
    # ---------------------------------

    body = f"""
A new Internal NCR has been raised.

NCR Number : {ncr.ncr_number}

Project : {ncr.project_name}


MAK No : {ncr.mak_number}

Department : {ncr.department}

Quantity : {ncr.quantity}

Plant : {ncr.plant}

Please view this email in HTML format for complete NCR details.
"""

    # ---------------------------------
    # Send Email
    # ---------------------------------

    if recipients:

        try:

            send_email(
                subject=f"🟠 Internal NCR Raised | {ncr.ncr_number}",
                recipients=recipients,
                body=body,
                html=html
            )

            print("✅ HTML EMAIL SENT SUCCESSFULLY")

        except Exception as e:

            print("❌ EMAIL FAILED")
            print(e)

    else:

        print("⚠ No recipients found. Email not sent.")

    return ncr