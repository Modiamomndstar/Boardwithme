from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from .models import BoardwithmeAd
from .serializers import BoardwithmeAdSerializer

class BoardwithmeAdViewSet(viewsets.ModelViewSet):
    queryset = BoardwithmeAd.objects.all()
    serializer_class = BoardwithmeAdSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
