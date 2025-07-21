from django.urls import path
from .views import deposit, verify

urlpatterns = [
    path('pay/', deposit, name='pay'),
    path('verify/', verify, name='verify'),
]
