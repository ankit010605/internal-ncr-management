from flask import jsonify

from app.api import api
from app.services.ncr.get_ncr_details import fetch_ncr_details


@api.get("/ncr/<int:ncr_id>")
def get_ncr_details(ncr_id):

    data = fetch_ncr_details(ncr_id)

    if not data:
        return jsonify({
            "success": False,
            "message": "NCR not found"
        }), 404

    return jsonify({
        "success": True,
        "data": data
    }), 200