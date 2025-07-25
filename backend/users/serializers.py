from rest_framework import serializers
from .models import User
import re

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm = serializers.CharField(write_only=True)
    policy_accepted = serializers.BooleanField(write_only=True)

    class Meta:
        model = User
        fields = [
            'phone_number', 'username', 'email', 'password', 'confirm', 'full_name', 'address', 'state', 'city',
            'gender', 'age_bracket', 'occupation', 'user_type', 'frequent_traveler', 'experience_years',
            'policy_accepted', 'driver_type', 'garage', 'bank_name', 'bank_account'
        ]

    def validate(self, data):
        if data['password'] != data['confirm']:
            raise serializers.ValidationError("Passwords do not match.")
        if not data.get('policy_accepted'):
            raise serializers.ValidationError("You must accept the policy.")
        return data

    def validate_phone_number(self, value):
        if not re.fullmatch(r'0\d{10}', value):
            raise serializers.ValidationError("Phone number must be 11 digits and start with 0.")
        return value

    def create(self, validated_data):
        validated_data.pop('confirm')
        validated_data.pop('policy_accepted')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class KYCSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'license_number', 'vehicle_reg', 'vehicle_type', 'total_seats',
            'garage', 'bank_name', 'bank_account', 'license_file', 'vehicle_file', 'driver_type'
        ]

class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'full_name', 'email', 'phone_number', 'address', 'state', 'city', 'gender', 'age_bracket', 'occupation'
        ]
