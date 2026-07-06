from flask import jsonify, request

from app.api import api

from app.services.ncr.create_ncr import create_ncr
from app.services.ncr.list_ncr import fetch_all_ncrs
from app.services.ncr.close_ncr import close_ncr



@api.post("/ncr")
def create_internal_ncr():

    # ---------------- FORM DATA ----------------
    data = request.form.to_dict()

    # ---------------- FILES ----------------

    files = request.files.getlist("attachments")
    print("=" * 50)

    print("FILES RECEIVED:", len(files))

    for f in files:
      print("Filename:", f.filename)
      print("Content Type:", f.content_type)
      print("Content Length:", request.content_length)

    print("=" * 50)

    # ---------------- VALIDATION ----------------
    if not data.get("project_name"):
        return jsonify({
            "success": False,
            "message": "Project Name is required."
        }), 400

    if not data.get("plant"):
        return jsonify({
            "success": False,
            "message": "Plant is required."
        }), 400

    if not data.get("ncr_description"):
        return jsonify({
            "success": False,
            "message": "NCR Description is required."
        }), 400

    
    # ---------------- SAVE NCR ----------------
    ncr = create_ncr(data, files)

    return jsonify({
        "success": True,
        "message": "Internal NCR created successfully.",
        "data": ncr.to_dict()
    }), 201


@api.get("/ncr")
def get_all_internal_ncr():

    ncrs = fetch_all_ncrs()

    return jsonify({
        "success": True,
        "count": len(ncrs),
        "data": ncrs
    }), 200


@api.put("/ncr/<int:ncr_id>/close")
def close_internal_ncr(ncr_id):

    ncr = close_ncr(ncr_id)

    if not ncr:
        return jsonify({
            "success": False,
            "message": "NCR not found."
        }), 404

    return jsonify({
        "success": True,
        "message": "NCR Closed Successfully.",
        "data": ncr.to_dict()
    }), 200