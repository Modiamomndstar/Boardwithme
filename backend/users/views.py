from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    from .serializers import UserSerializer
    return Response(UserSerializer(request.user).data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_kyc(request):
    user = request.user
    if user.user_type != 'driver':
        return Response({'detail': 'Only drivers can upload'}, status=status.HTTP_403_FORBIDDEN)

    user.license_file  = request.FILES.get('license_file')
    user.vehicle_file  = request.FILES.get('vehicle_file')
    user.save()
    return Response({'detail': 'KYC uploaded'}, status=status.HTTP_200_OK)
