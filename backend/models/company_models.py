from pymongo import MongoClient
from config.database import db  # Importas tu conexión existente

class Company:
    def __init__(self):
        self.collection = db['companies']  # Nueva colección para empresas
    
    def create_company(self, company_data):
        try:
            result = self.collection.insert_one(company_data)
            return str(result.inserted_id)
        except Exception as e:
            print(f"Error creando empresa: {e}")
            return None

# Instancia global para usar
company_model = Company()