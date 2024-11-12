from settings.base import *  # noqa
import os

SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = False

ALLOWED_HOSTS = [
    "backend",
    "localhost",
    os.getenv("URI"),
]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "https://" + os.getenv("URI"),
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://" + os.getenv("URI"),
]
CORS_ALLOW_METHODS = ("GET", "POST", "PUT", "DELETE", "OPTIONS")
CORS_ALLOW_CREDENTIALS = True
