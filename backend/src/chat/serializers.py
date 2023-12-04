from rest_framework import serializers
from . models import ChatRoom, ChatMessage

GENDERS = (
    ('MALE', 'Male'),
    ('FEMALE', 'Female'),
    ('OTHER', 'Other'),
)

class InitializeChatSerializer(serializers.Serializer):
    user_id = serializers.CharField(max_length=20)
    nickname = serializers.CharField(max_length=20)
    gender = serializers.ChoiceField(choices=GENDERS)
    interested_gender = serializers.ChoiceField(choices=GENDERS)


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['initiator', 'message', 'timestamp']


class ChatRoomSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, source='chat_messages', read_only=True)

    class Meta:
        model = ChatRoom
        fields = ['room_id', 'messages']


class SendChatMessageSerializer(serializers.Serializer):
    room_id = serializers.UUIDField()
    initiator = serializers.CharField(max_length=20)
    message = serializers.CharField(max_length=255)


class ChatRoomInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ['room_id', 'name', 'member1', 'member2', 'status']
        