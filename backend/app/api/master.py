from flask import jsonify

from app.api import api
from app.services.master_service import fetch_master_data


@api.get("/master")
def get_master_data():

    data = fetch_master_data()

    return jsonify(
        {
            "success": True,
            "count": len(data),
            "data": data,
        }
    ), 200