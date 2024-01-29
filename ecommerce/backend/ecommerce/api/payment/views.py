import mercadopago, uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from decouple import config
from rest_framework import status

class ProcessPaymentView(APIView):
    def post(self, request):
        sdk = mercadopago.SDK(config("MP_ACCESS_TOKEN"))
        data = request.data
        request_options = mercadopago.config.RequestOptions()
        request_options.custom_headers = {
            'x-idempotency-key': str(uuid.uuid4()),
        }
        default_data = {
            "transaction_amount": float(data.get("transaction_amount")),
            "payer": data.get("payer"),
            "payment_method_id": data.get("payment_method_id"),
        }
        if data.get("payment_method_id") != "pix":
            default_data["token"] = data.get("token")
            default_data["installments"] = int(data.get("installments"))
            default_data["description"] = data.get("description")
        payment_response = sdk.payment().create(default_data, request_options)
        payment = payment_response["response"]
        print(payment)
        return Response(payment, status=status.HTTP_201_CREATED)

class WebHookNotificationAPIView(APIView):
    pass