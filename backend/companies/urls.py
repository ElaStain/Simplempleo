from django.urls import path
from . import views

urlpatterns = [
    path('api/companies/', views.create_company, name='create_company'),
]