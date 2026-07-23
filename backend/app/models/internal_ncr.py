from datetime import datetime

from app.constants.status import STATUS_OPEN
from app.database.db import db


class InternalNCR(db.Model):
    __tablename__ = "internal_ncr"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # NCR Details
    ncr_number = db.Column(
        db.String(30),
        unique=True,
        nullable=False
    )

    project_name = db.Column(
        db.String(200),
        nullable=False
    )

    drawing_number = db.Column(
        db.String(100),
        nullable=True
    )

    mak_number = db.Column(
        db.String(100),
        nullable=True
    )

    quantity = db.Column(
        db.Integer,
        nullable=True
    )

    department = db.Column(
        db.String(100),
        nullable=True
    )

    contractor = db.Column(
        db.String(200),
        nullable=True
    )

    plant = db.Column(
        db.String(100),
        nullable=False
    )

    bay = db.Column(
        db.String(100),
        nullable=True
    )

    stage = db.Column(
        db.String(150),
        nullable=True
    )

    # Auto Filled From Plant Master
    production_incharge_name = db.Column(
        db.String(150),
        nullable=True
    )

    production_incharge_email = db.Column(
        db.String(150),
        nullable=True
    )

    quality_incharge_name = db.Column(
        db.String(150),
        nullable=True
    )

    quality_incharge_email = db.Column(
        db.String(150),
        nullable=True
    )

    # Responsibility
    initiator_name = db.Column(
        db.String(150),
        nullable=True
    )

    initiator_email = db.Column(
        db.String(150),
        nullable=True
    )

    closing_responsibility = db.Column(
        db.String(150),
        nullable=True
    )

    responsible_person = db.Column(
        db.String(150),
        nullable=True
    )

    responsible_email = db.Column(
        db.String(150),
        nullable=True
    )

    # Dates
    issue_date = db.Column(
        db.Date,
        nullable=True
    )

    target_closing_date = db.Column(
        db.Date,
        nullable=True
    )

    # NCR Details
    ncr_description = db.Column(
        db.Text,
        nullable=False
    )

    root_cause_analysis = db.Column(
        db.Text,
        nullable=True
    )

    corrective_preventive_action = db.Column(
        db.Text,
        nullable=True
    )

    # Status
    status = db.Column(
        db.String(20),
        nullable=False,
        default=STATUS_OPEN
    )

    # Closure Details
    closed_by = db.Column(
        db.String(150),
        nullable=True
    )

    closed_date = db.Column(
        db.DateTime,
        nullable=True
    )

    # Soft Delete
    is_active = db.Column(
        db.Boolean,
        nullable=False,
        default=True
    )

    # Audit Fields
    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    # Relationship
    attachments = db.relationship(
        "NCRAttachment",
        backref="internal_ncr",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<InternalNCR {self.ncr_number}>"

    def to_dict(self):
        return {
            "id": self.id,
            "ncr_number": self.ncr_number,
            "project_name": self.project_name,
            "drawing_number": self.drawing_number,
            "mak_number": self.mak_number,
            "quantity": self.quantity,
            "department": self.department,
            "contractor": self.contractor,
            "plant": self.plant,
            "bay": self.bay,
            "stage": self.stage,
            "production_incharge_name": self.production_incharge_name,
            "production_incharge_email": self.production_incharge_email,
            "quality_incharge_name": self.quality_incharge_name,
            "quality_incharge_email": self.quality_incharge_email,
            "initiator_name": self.initiator_name,
            "initiator_email": self.initiator_email,
            "closing_responsibility": self.closing_responsibility,
            "responsible_person": self.responsible_person,
            "responsible_email": self.responsible_email,
            "issue_date": self.issue_date.isoformat() if self.issue_date else None,
            "target_closing_date": self.target_closing_date.isoformat() if self.target_closing_date else None,
            "ncr_description": self.ncr_description,
            "root_cause_analysis": self.root_cause_analysis,
            "corrective_preventive_action": self.corrective_preventive_action,
            "status": self.status,
            "closed_by": self.closed_by,
            "closed_date": self.closed_date.isoformat() if self.closed_date else None,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "attachments": [
                {
                    "id": attachment.id,
                    "image_url": attachment.image_url
                }
                for attachment in self.attachments
            ]
        }