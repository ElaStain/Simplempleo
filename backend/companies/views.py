from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .models import Company

@csrf_exempt
@require_http_methods(["POST"])
def create_company(request):
    try:
        data = json.loads(request.body)
        
        company = Company.objects.create(
            company_name=data['company_name'],
            industry=data['industry'],
            contact_email=data['contact_email'],
            address=data.get('address'),
            website_url=data.get('website_url'),
            description=data.get('description'),
            recruiter_name=data['recruiter_name'],
            recruiter_position=data['recruiter_position'],
            recruiter_email=data['recruiter_email'],
            recruiter_password=data['recruiter_password']
        )
        
        return JsonResponse({
            'message': 'Empresa registrada exitosamente',
            'company_id': company.id
        }, status=201)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)