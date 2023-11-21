import uuid
from django.db import models


class ChatRoom(models.Model):
    status = (
        ('MATCHED', 'Matched'),
        ('WAITING', 'Waiting'),
        ('ENDED', 'Ended'),
    )
    room_id = models.UUIDField(unique=True, editable=False, default=uuid.uuid4)
    name = models.CharField(max_length=20, null=True, blank=True)
    member1 = models.CharField(max_length=20, null=True)
    member2 = models.CharField(max_length=20, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=status, max_length=20)
    ended_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.roomId + ' -> ' + str(self.name)


class ChatMessage(models.Model):
    chat = models.ForeignKey(
        ChatRoom, on_delete=models.CASCADE, related_name='chat_messages'
    )
    initiator = models.CharField(max_length=20)
    message = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message[:20]
