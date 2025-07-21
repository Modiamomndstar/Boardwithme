from django.db import models
from users.models import User

class BoardwithmeAd(models.Model):
    creator         = models.ForeignKey(User, on_delete=models.CASCADE)
    origin          = models.CharField(max_length=100)
    destination     = models.CharField(max_length=100)
    preferred_date  = models.DateField()
    pickup_time     = models.TimeField()
    vehicle_type    = models.CharField(max_length=50)
    total_seats_needed = models.PositiveSmallIntegerField()
    seats_booked    = models.PositiveSmallIntegerField(default=0)
    base_price      = models.PositiveIntegerField()
    passenger_price = models.PositiveIntegerField()
    pickup_point    = models.CharField(max_length=255)
    status          = models.CharField(max_length=15, default='open')

    def __str__(self):
        return f"{self.origin} → {self.destination} ({self.creator.phone_number})"
