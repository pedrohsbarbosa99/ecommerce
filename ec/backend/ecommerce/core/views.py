import mercadopago, uuid, json
from django.shortcuts import render, HttpResponse


def home(request):
    return render(request, "index.html")

def process_payment(request):
    sdk = mercadopago.SDK("TEST-1566758327130261-101820-7f4a70b49d039e8bdf9273e01cbcf1b6-423124976")
    
    if request.method == "POST":
        data = json.loads(request.body)
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
        return HttpResponse(json.dumps(payment), content_type="application/json")
    return render(request, "index.html")

def checkout(request):
    print(request.body)
    return render(request, "index.html")
