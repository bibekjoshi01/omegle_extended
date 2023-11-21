from rest_framework import serializers
from . models import ChatRoom, ChatMessage


class InitializeChatSerializer(serializers.Serializer):
    user_id = serializers.CharField(max_length=20)
    user_name = serializers.CharField(max_length=20)


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
