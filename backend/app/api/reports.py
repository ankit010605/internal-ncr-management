from flask import jsonify

from app.api import api
from app.services.reports.get_reports import fetch_reports


@api.get("/reports")
def get_reports():

    reports = fetch_reports()

    return jsonify({
        "success": True,
        "count": len(reports),
        "data": reports
    }), 200