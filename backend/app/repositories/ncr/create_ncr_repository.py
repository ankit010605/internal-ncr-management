from app.database.db import db


def save_ncr(ncr):
    """
    Save or update an NCR.
    SQLAlchemy automatically saves attachments because of the
    relationship cascade defined in InternalNCR.
    """
    db.session.add(ncr)
    db.session.commit()
    db.session.refresh(ncr)

    return ncr