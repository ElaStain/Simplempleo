import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

def get_mongodb_client():
    uri = os.getenv('MONGODB_URI', 'mongodb+srv://fullstack:TJWEq6PsSwEjXdLh@simplempleorec.2bm1on5.mongodb.net/?appName=SimplempleoRec')
    
    client = MongoClient(uri, server_api=ServerApi('1'))
    
    try:
        client.admin.command('ping')
        print("✅ MongoDB conectado para Django!")
        return client
    except Exception as e:
        print(f"❌ Error MongoDB: {e}")
        return None

# Cliente global
mongodb_client = get_mongodb_client()
db = mongodb_client['nombre_de_tu_db'] if mongodb_client else None