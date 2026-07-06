from flask import Flask
from flask_cors import CORS
from flask_mail import Mail

from config import Config
from app.database.db import db, migrate

mail = Mail()


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    # Initialize Mail
    mail.init_app(app)

    # Enable CORS
    CORS(app)

    # Database
    db.init_app(app)

    # Import models
    from app import models

    migrate.init_app(app, db)

    # Seed Commands
    from app.seed import register_seed_commands
    register_seed_commands(app)

    # Register API Routes
    from app.api import api
    from app.api import health
    from app.api import master
    from app.api import ncr
    from app.api import ncr_details
    from app.api import reports
    from app.api import test_email
    app.register_blueprint(api, url_prefix="/api")

    return app