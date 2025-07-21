# backend/payments/services.py
import os
from paystackapi.transaction import Transaction
from paystackapi.verification import Verification

SECRET = os.getenv("PAYSTACK_SECRET_KEY")

def initialize_payment(amount_kobo: int, email: str, ref: str):
    return Transaction.initialize(
        amount=amount_kobo,
        email=email,
        reference=ref,
        callback_url="http://localhost:5173/payment/callback",
    )

def verify_payment(ref: str):
    return Transaction.verify(reference=ref)
