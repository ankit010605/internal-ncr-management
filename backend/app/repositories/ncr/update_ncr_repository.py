from app.database.db import db


def update_ncr(ncr):
    db.session.commit()
    db.session.refresh(ncr)
    return ncr