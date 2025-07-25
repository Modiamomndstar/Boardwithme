from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPES = (
        ('passenger', 'Passenger'),
        ('driver',    'Driver'),
        ('admin',     'Admin'),
        ('superadmin','Superadmin'),
    )

    phone_number = models.CharField(max_length=15, unique=True)
    email        = models.EmailField(blank=True, null=True)
    user_type    = models.CharField(max_length=12, choices=USER_TYPES, default='passenger')
    full_name    = models.CharField(max_length=255, blank=True)
    address      = models.CharField(max_length=255, blank=True)
    state        = models.CharField(max_length=50, blank=True)
    city         = models.CharField(max_length=100, blank=True)
    gender       = models.CharField(max_length=20, blank=True)
    age_bracket  = models.CharField(max_length=30, blank=True)  # e.g. "18-25", "26-35"
    occupation   = models.CharField(max_length=100, blank=True)
    frequent_traveler = models.CharField(max_length=10, blank=True)  # e.g. "yes"/"no"
    experience_years  = models.PositiveSmallIntegerField(null=True, blank=True)
    kyc_status   = models.CharField(max_length=20, default='pending')  # pending, approved, rejected

    # driver extras
    license_number   = models.CharField(max_length=50, blank=True)
    vehicle_reg      = models.CharField(max_length=50, blank=True)
    vehicle_type     = models.CharField(max_length=50, blank=True)
    total_seats      = models.PositiveSmallIntegerField(null=True, blank=True)
    garage           = models.CharField(max_length=100, blank=True)
    bank_name        = models.CharField(max_length=100, blank=True)
    bank_account     = models.CharField(max_length=20, blank=True)  # NUBAN, increased to 20 for safety
    license_file     = models.FileField(upload_to='licenses/', blank=True, null=True)
    vehicle_file     = models.FileField(upload_to='vehicles/', blank=True, null=True)
    driver_type      = models.CharField(max_length=20, choices=[('freelance', 'Freelance'), ('garage', 'Garage-affiliated')], blank=True)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.phone_number
