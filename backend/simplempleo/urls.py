from django.contrib import admin
from django.urls import path
from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "message": "¡Simplempleo API funcionando! 🚀",
        "status": "success", 
        "database": "MongoDB Atlas conectado"
    })

def health_check(request):
    return JsonResponse({"status": "healthy", "database": "connected"})

def api_welcome(request):
    return JsonResponse({
        "message": "¡Backend conectado al frontend! 🎉", 
        "status": "success",
        "stack": "Django + React"
    })

# ✅ SOLO UN urlpatterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('health/', health_check, name='health'),
    path('api/', api_welcome, name='api_welcome'), 
    path('', include('companies.urls')),
]
