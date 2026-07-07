import os

from dotenv import load_dotenv

load_dotenv()


class Config:

    SECRET_KEY = os.getenv("SECRET_KEY")

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Cloudinary
    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

    # -----------------------------
    # Mail Configuration
    # -----------------------------

    MAIL_SERVER = os.getenv("MAIL_SERVER")

    MAIL_PORT = int(os.getenv("MAIL_PORT"))

    MAIL_USE_TLS = True

    MAIL_USE_SSL = False

    MAIL_USERNAME = os.getenv("MAIL_USERNAME")

    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")

    MAIL_DEFAULT_SENDER = (
        "Internal NCR Management System",
        os.getenv("MAIL_USERNAME"),
    )
    RESEND_API_KEY = os.getenv("RESEND_API_KEY")