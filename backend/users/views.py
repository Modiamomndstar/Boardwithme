from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, KYCSerializer, ProfileUpdateSerializer

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
    serializer = KYCSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save(kyc_status='pending')
        return Response({'detail': 'KYC uploaded'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"detail": "Account created!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    serializer = ProfileUpdateSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"detail": "Profile updated!"})
    return Response(serializer.errors, status=400)
