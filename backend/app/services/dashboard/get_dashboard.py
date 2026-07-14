from datetime import date, timedelta

from app.constants.status import STATUS_OPEN, STATUS_CLOSED
from app.repositories.dashboard.dashboard_repository import get_all_ncrs


def get_dashboard():

    ncrs = get_all_ncrs()

    # ==================================================
    # SUMMARY
    # ==================================================

    total = len(ncrs)

    open_count = len([
        n for n in ncrs
        if n.status == STATUS_OPEN
    ])

    closed_count = len([
        n for n in ncrs
        if n.status == STATUS_CLOSED
    ])

    # ==================================================
    # CURRENT & PREVIOUS WEEK
    # ==================================================

    today = date.today()

    current_week_start = today - timedelta(days=today.weekday())
    current_week_end = current_week_start + timedelta(days=6)

    previous_week_start = current_week_start - timedelta(days=7)
    previous_week_end = current_week_start - timedelta(days=1)

    current_week_count = 0
    previous_week_count = 0

    # ==================================================
    # DATA HOLDERS
    # ==================================================

    plant_counts = {}
    contractor_counts = {}
    open_plant_counts = {}

    # ==================================================
    # PROCESS NCRS
    # ==================================================

    for ncr in ncrs:

        plant = ncr.plant or "Unknown"

        contractor = ncr.contractor or "Not Assigned"

        # -----------------------------
        # Plant-wise Count
        # -----------------------------

        plant_counts[plant] = plant_counts.get(plant, 0) + 1

        # -----------------------------
        # Contractor-wise Count
        # -----------------------------

        contractor_counts[contractor] = contractor_counts.get(contractor, 0) + 1

        # -----------------------------
        # Open NCR by Plant
        # -----------------------------

        if ncr.status == STATUS_OPEN:

            open_plant_counts[plant] = (
                open_plant_counts.get(plant, 0) + 1
            )

        # -----------------------------
        # Weekly Counts
        # -----------------------------

        if ncr.issue_date:

            if current_week_start <= ncr.issue_date <= current_week_end:

                current_week_count += 1

            elif previous_week_start <= ncr.issue_date <= previous_week_end:

                previous_week_count += 1

    # ==================================================
    # WEEKLY CHANGE
    # ==================================================

    if previous_week_count == 0:

        weekly_change = 100 if current_week_count else 0

    else:

        weekly_change = round(
            (
                (current_week_count - previous_week_count)
                / previous_week_count
            ) * 100,
            2
        )

    # ==================================================
    # PLANT-WISE DATA
    # ==================================================

    plant_wise = [

        {
            "plant": plant,
            "count": count
        }

        for plant, count in sorted(
            plant_counts.items(),
            key=lambda x: x[0]
        )

    ]

    # ==================================================
    # CONTRACTOR-WISE DATA
    # ==================================================

    contractor_wise = [

        {
            "contractor": contractor,
            "count": count
        }

        for contractor, count in sorted(
            contractor_counts.items(),
            key=lambda x: x[1],
            reverse=True
        )

    ]

    # ==================================================
    # OPEN NCR BY PLANT
    # ==================================================

    open_by_plant = [

        {
            "plant": plant,
            "count": count
        }

        for plant, count in sorted(
            open_plant_counts.items(),
            key=lambda x: x[0]
        )

    ]

    # ==================================================
    # WEEKLY TREND (LAST 8 WEEKS)
    # ==================================================

    weekly_trend = []

    for i in range(7, -1, -1):

        week_start = current_week_start - timedelta(days=i * 7)

        week_end = week_start + timedelta(days=6)

        count = sum(

            1

            for ncr in ncrs

            if (
                ncr.issue_date
                and week_start <= ncr.issue_date <= week_end
            )

        )

        weekly_trend.append({

            "week": week_start.strftime("%d %b"),

            "count": count

        })

    # ==================================================
    # RETURN DASHBOARD
    # ==================================================

    return {

        "summary": {

            "total": total,

            "open": open_count,

            "closed": closed_count

        },

        "current_week": {

            "start": current_week_start.strftime("%d-%b-%Y"),

            "end": current_week_end.strftime("%d-%b-%Y"),

            "count": current_week_count

        },

        "previous_week": {

            "start": previous_week_start.strftime("%d-%b-%Y"),

            "end": previous_week_end.strftime("%d-%b-%Y"),

            "count": previous_week_count

        },

        "weekly_change": weekly_change,

        "plant_wise": plant_wise,

        "contractor_wise": contractor_wise,

        "weekly_trend": weekly_trend,

        "open_by_plant": open_by_plant

    }