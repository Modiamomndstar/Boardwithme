from django.db import models
from users.models import User
from trips.models import Trip

class Booking(models.Model):
    trip         = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='bookings')
    passenger    = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    seats_booked = models.PositiveSmallIntegerField()
    status       = models.CharField(max_length=15, default='pending')  # pending, confirmed, cancelled
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.passenger.phone_number} booked {self.seats_booked} seat(s) on {self.trip}"
