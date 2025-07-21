from django.db import models
from users.models import User
from trips.models import Trip

class ChatGroup(models.Model):
    trip    = models.OneToOneField(Trip, on_delete=models.CASCADE, related_name='chat_group')
    members = models.ManyToManyField(User, related_name='chat_groups')

class Message(models.Model):
    chat_group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE, related_name='messages')
    sender     = models.ForeignKey(User, on_delete=models.CASCADE)
    content    = models.TextField()
    timestamp  = models.DateTimeField(auto_now_add=True)
