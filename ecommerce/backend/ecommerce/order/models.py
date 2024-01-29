from django.db import models

from ecommerce.product.models import Product

# Create your models here.
class Order(models.Model):
    # colocar o usuario
    payment_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    finish = models.BooleanField(default=False)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
