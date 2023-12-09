from rest_framework import serializers
from .models import ChatRoom, ChatMessage

GENDERS = (
    ("MALE", "Male"),
    ("FEMALE", "Female"),
    ("OTHER", "Other"),
)


class InitializeChatSerializer(serializers.Serializer):
    nickname = serializers.CharField(max_length=20)
    gender = serializers.ChoiceField(choices=GENDERS)
    interested_gender = serializers.ChoiceField(choices=GENDERS)


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ["id", "initiator", "message", "timestamp"]


class ChatRoomSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, source="chat_messages", read_only=True)

    class Meta:
        model = ChatRoom
        fields = ["room_id", "messages"]


class SendChatMessageSerializer(serializers.Serializer):
    room_id = serializers.UUIDField()
    initiator_id = serializers.CharField(max_length=20)
    message = serializers.CharField(max_length=255)


class ChatRoomInfoSerializer(serializers.ModelSerializer):
    member1_nickname = serializers.SerializerMethodField()
    member1_id = serializers.SerializerMethodField()
    member2_nickname = serializers.SerializerMethodField()
    member2_id = serializers.SerializerMethodField()
    started_at = serializers.DateTimeField(source="created_at")

    class Meta:
        model = ChatRoom
        fields = [
            "room_id",
            "name",
            "member1_nickname",
            "member1_id",
            "member2_nickname",
            "member2_id",
            "status",
            "started_at",
        ]

    def get_member_name(self, user_id):
        # Assuming the user_id is in the format "Name-some_id"
        # Split the string and return the first part as the name
        return user_id.split("-")[0] if user_id else None

    def get_member_id(self, user_id):
        # Assuming the user_id is in the format "Name-some_id"
        # Split the string and return the second part as the name
        return user_id.split("-")[1] if user_id else None

    def get_member1_nickname(self, obj):
        return self.get_member_name(obj.member1)

    def get_member2_nickname(self, obj):
        return self.get_member_name(obj.member2)

    def get_member1_id(self, obj):
        return self.get_member_id(obj.member1)

    def get_member2_id(self, obj):
        return self.get_member_id(obj.member2)
