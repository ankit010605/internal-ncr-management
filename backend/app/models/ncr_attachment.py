from datetime import datetime

from app.database.db import db


class NCRAttachment(db.Model):
    __tablename__ = "ncr_attachment"

    id = db.Column(db.Integer, primary_key=True)

    ncr_id = db.Column(
        db.Integer,
        db.ForeignKey("internal_ncr.id"),
        nullable=False
    )

    image_url = db.Column(
        db.String(500),
        nullable=False
    )

    uploaded_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )