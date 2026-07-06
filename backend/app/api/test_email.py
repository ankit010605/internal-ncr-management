print("TEST EMAIL API LOADED")

from app.api import api


@api.get("/test-email")
def test_email():
    return {
        "success": True,
        "message": "Hello from test route"
    }