from app.models.plant_master import PlantMaster


def get_plant_details(plant, bay):
    query = PlantMaster.query.filter_by(
        plant_name=plant,
        is_active=True
    )

    if bay:
        query = query.filter_by(bay_name=bay)
    else:
        query = query.filter_by(requires_bay=False)

    return query.first()