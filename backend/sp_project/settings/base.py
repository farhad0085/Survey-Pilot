import os
from pathlib import Path
from dotenv import load_dotenv
from corsheaders.defaults import default_headers
from distutils.util import strtobool

BASE_DIR = Path(__file__).resolve().parent.parent.parent

ENV_PATH = os.path.join(BASE_DIR, ".env")
load_dotenv(ENV_PATH)

ENVIRONMENT = os.environ.get("ENVIRONMENT")
SECRET_KEY = os.environ.get("SECRET_KEY")

INSTALLED_APPS = [
    "jazzmin",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # rest
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    # apps
    "poll",
    "survey",
    "user",
]

WSGI_APPLICATION = "sp_project.wsgi.application"
SITE_ID = 1
X_FRAME_OPTIONS = "SAMEORIGIN"
SILENCED_SYSTEM_CHECKS = [
    "security.W019"
]  # https://docs.djangoproject.com/en/4.0/ref/checks/


MIDDLEWARE = [
    "common.middlewares.TimezoneOffsetMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# add sql queries log to middleware
if strtobool(os.environ.get("SHOW_SQL_QUERY_LOG", "False")):
    MIDDLEWARE += [
        "common.middlewares.SqlPrintingMiddleware",
    ]

ROOT_URLCONF = "sp_project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "user", "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

AUTH_PASSWORD_VALIDATORS = []

AUTHENTICATION_BACKENDS = ["user.backends.AuthBackend"]


LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = "/staticfiles/"
STATIC_ROOT = "staticfiles"
MEDIA_ROOT = os.path.join(BASE_DIR, "mediafiles")
MEDIA_URL = "/mediafiles/"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

AUTH_USER_MODEL = "user.UserAccount"  # Custom User Model
PASSWORD_RESET_TIMEOUT = 86400  # 24 hours in second
LOGOUT_AFTER_PASSWORD_CHANGE = False
OLD_PASSWORD_FIELD_ENABLED = True  # For password change
DATA_UPLOAD_MAX_NUMBER_FIELDS = None


# CORS settings
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_HEADERS = [
    *default_headers,
    "x-api-timezone-offset",
]

# emails for sending error mails
ADMINS = [
    ("Farhad", os.environ.get("ADMIN_EMAIL")),
]

# Email settings
SERVER_EMAIL = os.environ.get("SERVER_EMAIL")  # used for sending error messages to email
DEFAULT_FROM_EMAIL = os.environ.get("SERVER_EMAIL")
EMAIL_HOST = os.environ.get("EMAIL_HOST")
EMAIL_PORT = os.environ.get("EMAIL_PORT")
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD")

# for alert emails triggers
ALERT_EMAIL_HOST_USER = os.environ.get("ALERT_EMAIL_HOST_USER")
ALERT_EMAIL_FROM_EMAIL = os.environ.get("ALERT_EMAIL_FROM_EMAIL")
ALERT_EMAIL_HOST_PASSWORD = os.environ.get("ALERT_EMAIL_HOST_PASSWORD")
ALERT_EMAIL_HOST = os.environ.get("ALERT_EMAIL_HOST")
ALERT_EMAIL_PORT = os.environ.get("ALERT_EMAIL_PORT")
ALERT_EMAIL_USE_TLS = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

from .admin import *

# database settings
DATABASES = {
    "default": {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT'),
    },
}
