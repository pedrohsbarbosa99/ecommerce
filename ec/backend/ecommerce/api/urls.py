from django.urls import include, re_path


urlpatterns = [
    re_path(r"^payments/", include("ecommerce.api.payment.urls")),
]
