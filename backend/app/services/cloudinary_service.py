import cloudinary
import cloudinary.uploader

from config import Config


cloudinary.config(
    cloud_name=Config.CLOUDINARY_CLOUD_NAME,
    api_key=Config.CLOUDINARY_API_KEY,
    api_secret=Config.CLOUDINARY_API_SECRET,
    secure=True
)


def upload_to_cloudinary(file):

    file.stream.seek(0)

    result = cloudinary.uploader.upload(file)

    return result["secure_url"]