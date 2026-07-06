from app.models.plant_master import PlantMaster


def get_all_master_data():
    return (
        PlantMaster.query
        .filter_by(is_active=True)
        .order_by(
            PlantMaster.plant_name,
            PlantMaster.bay_name
        )
        .all()
    )