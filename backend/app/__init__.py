from flask import Flask
from flask_cors import CORS

from config import Config
from app.database.db import db, migrate


def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)

    from app import models

    migrate.init_app(app, db)

    from app.seed import register_seed_commands
    register_seed_commands(app)

    from app.api import api
    from app.api import health
    from app.api import master
    from app.api import ncr
    from app.api import ncr_details
    from app.api import reports
    from app.api import test_email

    app.register_blueprint(api, url_prefix="/api")

    return app