from django.urls import  re_path

from ecommerce.api.payment.views import ProcessPaymentView

urlpatterns = [
    re_path(r"^process$", ProcessPaymentView.as_view()),
]