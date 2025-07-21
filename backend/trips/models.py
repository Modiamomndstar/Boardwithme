from django.db import models
from users.models import User

class Trip(models.Model):
    TRIP_TYPE = (('Flexible','Flexible'), ('Express','Express'))
    TRIP_CAT  = (('Intrastate','Intrastate'), ('Interstate','Interstate'))

    driver         = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trips')
    origin         = models.CharField(max_length=100)
    destination    = models.CharField(max_length=100)
    trip_category  = models.CharField(max_length=15, choices=TRIP_CAT)
    trip_type      = models.CharField(max_length=10, choices=TRIP_TYPE)
    date           = models.DateField()
    pickup_time    = models.TimeField()
    total_seats    = models.PositiveSmallIntegerField()
    available_seats= models.PositiveSmallIntegerField()
    base_price     = models.PositiveIntegerField()
    passenger_price= models.PositiveIntegerField()
    pickup_point   = models.CharField(max_length=255)
    description    = models.TextField(blank=True)
    created_at     = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.origin} → {self.destination} on {self.date}"
