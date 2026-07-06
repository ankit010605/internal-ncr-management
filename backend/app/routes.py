from flask import jsonify


def register_routes(app):

    @app.get("/")
    def home():
        return jsonify(
            {
                "application": "Internal NCR Management System",
                "status": "Running",
                "version": "1.0.0",
            }
        )

    @app.get("/api/health")
    def health():
        return jsonify(
            {
                "success": True,
                "message": "Backend is running successfully."
            }
        )