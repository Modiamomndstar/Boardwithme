from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .services import initialize_payment, verify_payment
from bookings.models import Booking

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deposit(request):
    booking = Booking.objects.get(id=request.data['booking_id'], passenger=request.user)
    resp = initialize_payment(
        amount_kobo=int(booking.total_price * 100),
        email=request.user.email or 'test@example.com',
        ref=f"bwm-{booking.id}"
    )
    return Response(resp)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify(request):
    ref = request.data['reference']
    resp = verify_payment(ref)
    if resp['status']:
        Booking.objects.filter(id=ref.split('-')[-1]).update(status='paid')
    return Response(resp)
