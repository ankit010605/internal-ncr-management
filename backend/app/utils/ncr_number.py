from datetime import datetime

from app.models.internal_ncr import InternalNCR


def generate_ncr_number():
    """
    Generates NCR number in format:

    NCR-2026-000001
    """

    year = datetime.now().year

    last_ncr = (
        InternalNCR.query
        .order_by(InternalNCR.id.desc())
        .first()
    )

    if last_ncr is None:
        sequence = 1
    else:
        try:
            sequence = int(last_ncr.ncr_number.split("-")[-1]) + 1
        except Exception:
            sequence = last_ncr.id + 1

    return f"NCR-{year}-{sequence:06d}"