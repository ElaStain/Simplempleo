from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv

load_dotenv()

# Tu connection string de Atlas
uri = os.getenv("MONGODB_URI")

# Crear el cliente MongoDB (esto es lo que Django necesita)
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.simplempleoCloud

# Verificar conexión (opcional)
try:
    client.admin.command('ping')
    print("✅ Conectado a MongoDB Atlas - simplempleoCloud")
except Exception as e:
    print(f"❌ Error: {e}")

# Exportar para que Django pueda importarlo
mongodb_client = client