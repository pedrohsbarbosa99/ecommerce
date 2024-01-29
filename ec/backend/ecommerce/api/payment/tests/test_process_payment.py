from rest_framework.test import APITestCase
from unittest import mock

class TestProcessPayment(APITestCase):
    def setUp(self):
        pass

    def test_payment_must_return_201(self):
        payload = {
            "transaction_amount": 100,
            "payer": {
                "email": "9vLpL@example.com",
                "first_name": "John",
                "last_name": "Doe",
            },
            "payment_method_id": "master",
            "token": "token",
            "installments": 1,
            "description": "test",
        }
        with mock.patch("mercadopago.sdk.Payment.create") as mock_sdk:
            mock_sdk.return_value = {"response": payload}
            response = self.client.post("/api/payments/process", payload, format="json")
            self.assertEqual(response.status_code, 201)
