from app.models.internal_ncr import InternalNCR


def get_all_reports():
    return InternalNCR.query.order_by(
        InternalNCR.created_at.desc()
    ).all()