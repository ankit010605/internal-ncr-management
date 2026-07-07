from app.models.plant_master import PlantMaster


def get_plant_details(plant, bay):

    print("Searching Plant:", plant)
    print("Searching Bay:", bay)

    query = PlantMaster.query.filter_by(
        plant_name=plant,
        is_active=True
    )

    if bay:
        query = query.filter_by(bay_name=bay)
    else:
        query = query.filter_by(requires_bay=False)

    result = query.first()

    if result:
        print("FOUND RECORD")
        print("ID:", result.id)
        print("Plant:", result.plant_name)
        print("Bay:", result.bay_name)
        print("Production Email:", result.production_incharge_email)
        print("Quality Email:", result.quality_incharge_email)
    else:
        print("NO RECORD FOUND")

    return result