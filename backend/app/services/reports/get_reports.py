from app.repositories.reports.reports_repository import get_all_reports


def fetch_reports():

    reports = get_all_reports()

    return [
        report.to_dict()
        for report in reports
    ]