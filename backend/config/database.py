from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv

# Cargar variables del archivo .env
load_dotenv()

# Obtener la URI desde variables de entorno
uri = os.getenv("MONGODB_URI")

if not uri:
    raise ValueError("❌ MONGODB_URI no encontrada en variables de entorno")

client = MongoClient(uri, server_api=ServerApi('1'))
db = client.simplempleoCloud

try:
    client.admin.command('ping')
    print("✅ Conectado a MongoDB Atlas - simplempleoCloud")
except Exception as e:
    print(f"❌ Error: {e}")