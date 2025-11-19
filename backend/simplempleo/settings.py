import os
from pathlib import Path
from config.database import mongodb_client, db

BASE_DIR = Path(__file__).resolve().parent.parent

# MongoDB configuration
MONGODB_CLIENT = mongodb_client
MONGODB_DB = db

# Para APIs REST instala: pip install djangorestframework
INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'rest_framework',
    'corsheaders',
    'apps.users',
    'apps.api',
]

# Configuración para React
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React dev server
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ]
}