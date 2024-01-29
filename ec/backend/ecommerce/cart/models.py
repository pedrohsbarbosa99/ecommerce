from django.db import models
from ecommerce.product.models import Product

class Cart(models.Model):
    # colocar o usuario  
    created_at = models.DateTimeField(auto_now_add=True)
    finish = models.BooleanField(default=False)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
