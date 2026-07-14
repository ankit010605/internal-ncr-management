from app.models.internal_ncr import InternalNCR


def get_all_ncrs():
    return InternalNCR.query.all()