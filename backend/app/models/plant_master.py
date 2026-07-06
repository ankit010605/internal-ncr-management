from datetime import datetime

from app.database.db import db


class PlantMaster(db.Model):
    """
    Plant Master

    Stores Plant, Bay and In-Charge details.
    This table is used to populate the Plant/Bay dropdowns
    and automatically fetch Production & Quality In-Charge details.
    """

    __tablename__ = "plant_master"

    # Primary Key
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # Plant Name
    plant_name = db.Column(
        db.String(100),
        nullable=False
    )

    # Bay Name
    # For Plant 3 this will contain "Open Area"
    bay_name = db.Column(
        db.String(100),
        nullable=False
    )

    # Indicates whether this plant requires Bay selection
    requires_bay = db.Column(
        db.Boolean,
        nullable=False,
        default=True
    )

    # Production In-Charge
    production_incharge_name = db.Column(
        db.String(150),
        nullable=False
    )

    production_incharge_email = db.Column(
        db.String(150),
        nullable=False
    )

    # Quality In-Charge
    quality_incharge_name = db.Column(
        db.String(150),
        nullable=False
    )

    quality_incharge_email = db.Column(
        db.String(150),
        nullable=False
    )

    # Record Status
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

    def __repr__(self):
        return (
            f"<PlantMaster "
            f"Plant='{self.plant_name}' "
            f"Bay='{self.bay_name}'>"
        )

    def to_dict(self):
        return {
            "id": self.id,
            "plant_name": self.plant_name,
            "bay_name": self.bay_name,
            "requires_bay": self.requires_bay,
            "production_incharge_name": self.production_incharge_name,
            "production_incharge_email": self.production_incharge_email,
            "quality_incharge_name": self.quality_incharge_name,
            "quality_incharge_email": self.quality_incharge_email,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }