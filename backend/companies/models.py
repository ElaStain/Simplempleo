from django.db import models

class Company(models.Model):
    company_name = models.CharField(max_length=200)
    industry = models.CharField(max_length=100)
    contact_email = models.EmailField()
    address = models.URLField(blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    
    recruiter_name = models.CharField(max_length=100)
    recruiter_position = models.CharField(max_length=100)
    recruiter_email = models.EmailField()
    recruiter_password = models.CharField(max_length=100)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name