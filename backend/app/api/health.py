from flask import jsonify
from app.api import api


@api.route("/health", methods=["GET"])
def health():
    return jsonify(
        {
            "success": True,
            "message": "Internal NCR Backend Running",
            "version": "1.0.0",
        }
    )