from flask import jsonify, request

from app.api import api
from app.utils.cloudinary_upload import upload_image


@api.post("/test-upload")
def test_upload():

    file = request.files.get("file")

    if not file:
        return jsonify({
            "success": False,
            "message": "No file uploaded"
        }), 400

    url = upload_image(file)

    return jsonify({
        "success": True,
        "url": url
    })