from app.models.internal_ncr import InternalNCR


def get_ncr_by_id(ncr_id):
    return InternalNCR.query.get(ncr_id)