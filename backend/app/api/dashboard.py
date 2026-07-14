from flask import jsonify

from app.api import api

from app.services.dashboard.get_dashboard import get_dashboard


@api.get("/dashboard")
def dashboard():

    data = get_dashboard()

    return jsonify({
        "success": True,
        "data": data
    })