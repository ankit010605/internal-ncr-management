from app.models.internal_ncr import InternalNCR


def get_all_ncrs():
    return (
        InternalNCR.query
        .filter_by(is_active=True)
        .order_by(InternalNCR.created_at.desc())
        .all()
    )