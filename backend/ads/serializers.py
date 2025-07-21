from rest_framework import serializers
from .models import BoardwithmeAd

class BoardwithmeAdSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoardwithmeAd
        fields = '__all__'
        read_only_fields = ('creator', 'seats_booked')
