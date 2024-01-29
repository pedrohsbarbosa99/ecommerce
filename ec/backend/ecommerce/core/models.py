from django.db import models

class Discount(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    percentage = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expired_at = models.DateTimeField()
    # colocar usuario que atualizou
