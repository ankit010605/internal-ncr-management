from app.database.db import db
from app.models.plant_master import PlantMaster


def seed_plant_master():

    # Prevent duplicate records
    if PlantMaster.query.count() > 0:
        print("Plant Master already seeded.")
        return

    plants = [

        # -----------------------------
        # Plant 1
        # -----------------------------

        {
            "plant_name": "Plant 1",
            "bay_name": "Bay 1",
            "requires_bay": True,
            "production_incharge_name": "Rajesh Kumar",
            "production_incharge_email": "rajesh.kumar@company.com",
            "quality_incharge_name": "Amit Sharma",
            "quality_incharge_email": "amit.sharma@company.com",
        },

        {
            "plant_name": "Plant 1",
            "bay_name": "Bay 2",
            "requires_bay": True,
            "production_incharge_name": "Rajesh Kumar",
            "production_incharge_email": "rajesh.kumar@company.com",
            "quality_incharge_name": "Amit Sharma",
            "quality_incharge_email": "amit.sharma@company.com",
        },

        {
            "plant_name": "Plant 1",
            "bay_name": "Bay 3",
            "requires_bay": True,
            "production_incharge_name": "Rajesh Kumar",
            "production_incharge_email": "rajesh.kumar@company.com",
            "quality_incharge_name": "Amit Sharma",
            "quality_incharge_email": "amit.sharma@company.com",
        },

        {
            "plant_name": "Plant 1",
            "bay_name": "Bay 4",
            "requires_bay": True,
            "production_incharge_name": "Rajesh Kumar",
            "production_incharge_email": "rajesh.kumar@company.com",
            "quality_incharge_name": "Amit Sharma",
            "quality_incharge_email": "amit.sharma@company.com",
        },

        {
            "plant_name": "Plant 1",
            "bay_name": "Bay 5",
            "requires_bay": True,
            "production_incharge_name": "Rajesh Kumar",
            "production_incharge_email": "rajesh.kumar@company.com",
            "quality_incharge_name": "Amit Sharma",
            "quality_incharge_email": "amit.sharma@company.com",
        },

        {
            "plant_name": "Plant 1",
            "bay_name": "Bay 6",
            "requires_bay": True,
            "production_incharge_name": "Rajesh Kumar",
            "production_incharge_email": "rajesh.kumar@company.com",
            "quality_incharge_name": "Amit Sharma",
            "quality_incharge_email": "amit.sharma@company.com",
        },

        # -----------------------------
        # Plant 2
        # -----------------------------

        {
            "plant_name": "Plant 2",
            "bay_name": "Bay 1",
            "requires_bay": True,
            "production_incharge_name": "Vikram Singh",
            "production_incharge_email": "vikram.singh@company.com",
            "quality_incharge_name": "Neeraj Gupta",
            "quality_incharge_email": "neeraj.gupta@company.com",
        },

        {
            "plant_name": "Plant 2",
            "bay_name": "Bay 2",
            "requires_bay": True,
            "production_incharge_name": "Vikram Singh",
            "production_incharge_email": "vikram.singh@company.com",
            "quality_incharge_name": "Neeraj Gupta",
            "quality_incharge_email": "neeraj.gupta@company.com",
        },

        {
            "plant_name": "Plant 2",
            "bay_name": "Bay 3",
            "requires_bay": True,
            "production_incharge_name": "Vikram Singh",
            "production_incharge_email": "vikram.singh@company.com",
            "quality_incharge_name": "Neeraj Gupta",
            "quality_incharge_email": "neeraj.gupta@company.com",
        },

        {
            "plant_name": "Plant 2",
            "bay_name": "Bay 4",
            "requires_bay": True,
            "production_incharge_name": "Vikram Singh",
            "production_incharge_email": "vikram.singh@company.com",
            "quality_incharge_name": "Neeraj Gupta",
            "quality_incharge_email": "neeraj.gupta@company.com",
        },

        # -----------------------------
        # Plant 2A
        # -----------------------------

        {
            "plant_name": "Plant 2A",
            "bay_name": "Bay 1",
            "requires_bay": True,
            "production_incharge_name": "Sandeep Verma",
            "production_incharge_email": "sandeep.verma@company.com",
            "quality_incharge_name": "Deepak Yadav",
            "quality_incharge_email": "deepak.yadav@company.com",
        },

        {
            "plant_name": "Plant 2A",
            "bay_name": "Bay 2",
            "requires_bay": True,
            "production_incharge_name": "Sandeep Verma",
            "production_incharge_email": "sandeep.verma@company.com",
            "quality_incharge_name": "Deepak Yadav",
            "quality_incharge_email": "deepak.yadav@company.com",
        },

        # -----------------------------
        # Plant 3
        # -----------------------------

        {
            "plant_name": "Plant 3",
            "bay_name": "Open Area",
            "requires_bay": False,
            "production_incharge_name": "Mohit Jain",
            "production_incharge_email": "mohit.jain@company.com",
            "quality_incharge_name": "Pankaj Singh",
            "quality_incharge_email": "pankaj.singh@company.com",
        },

        # -----------------------------
        # Plant 4
        # -----------------------------

        {
            "plant_name": "Plant 4",
            "bay_name": "Bay 1",
            "requires_bay": True,
            "production_incharge_name": "Anil Mehta",
            "production_incharge_email": "anil.mehta@company.com",
            "quality_incharge_name": "Rakesh Patel",
            "quality_incharge_email": "rakesh.patel@company.com",
        },

        {
            "plant_name": "Plant 4",
            "bay_name": "Bay 2",
            "requires_bay": True,
            "production_incharge_name": "Anil Mehta",
            "production_incharge_email": "anil.mehta@company.com",
            "quality_incharge_name": "Rakesh Patel",
            "quality_incharge_email": "rakesh.patel@company.com",
        },

        {
            "plant_name": "Plant 4",
            "bay_name": "Bay 3",
            "requires_bay": True,
            "production_incharge_name": "Anil Mehta",
            "production_incharge_email": "anil.mehta@company.com",
            "quality_incharge_name": "Rakesh Patel",
            "quality_incharge_email": "rakesh.patel@company.com",
        },

        {
            "plant_name": "Plant 4",
            "bay_name": "Bay 4",
            "requires_bay": True,
            "production_incharge_name": "Anil Mehta",
            "production_incharge_email": "anil.mehta@company.com",
            "quality_incharge_name": "Rakesh Patel",
            "quality_incharge_email": "rakesh.patel@company.com",
        },

        {
            "plant_name": "Plant 4",
            "bay_name": "Bay 5",
            "requires_bay": True,
            "production_incharge_name": "Anil Mehta",
            "production_incharge_email": "anil.mehta@company.com",
            "quality_incharge_name": "Rakesh Patel",
            "quality_incharge_email": "rakesh.patel@company.com",
        },
    ]

    for plant in plants:
        db.session.add(PlantMaster(**plant))

    db.session.commit()

    print("Plant Master seeded successfully.")