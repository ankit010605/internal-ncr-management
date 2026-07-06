from app.models.internal_ncr import InternalNCR

from app.repositories.ncr.update_ncr_repository import update_ncr


def close_ncr(ncr_id):

    ncr = InternalNCR.query.get(ncr_id)

    if not ncr:
        return None

    ncr.status = "Closed"

    update_ncr(ncr)

    return ncr