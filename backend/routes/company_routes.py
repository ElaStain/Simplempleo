from flask import Blueprint, request, jsonify
from models.company_models import company_model

company_bp = Blueprint('company', __name__)

@company_bp.route('/api/companies', methods=['POST'])
def create_company():
    try:
        data = request.json
        
        # Insertar en MongoDB
        company_id = company_model.create_company(data)
        
        if company_id:
            return jsonify({
                'message': 'Empresa registrada exitosamente',
                'company_id': company_id
            }), 201
        else:
            return jsonify({'error': 'Error al guardar empresa'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 400