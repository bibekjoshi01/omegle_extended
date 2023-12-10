from django.db import transaction
from rest_framework import status
from django.utils import timezone
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError

from src.chat.utils import generate_unique_user_id

from .serializers import (
    InitializeChatSerializer,
    SendChatMessageSerializer,
    ChatRoomSerializer,
    ChatRoomInfoSerializer,
)
from .models import ChatRoom, ChatMessage


class InitializeChatAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = InitializeChatSerializer

    @transaction.atomic
    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )

        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data

            user_id = generate_unique_user_id()
            nickname = data["nickname"]

            # Matching Process will be here
            member_detail = "{}-{}".format(nickname, user_id)

            # Check if there's a user waiting for a match
            waiting_user = ChatRoom.objects.filter(
                member2=None, status="WAITING"
            ).first()

            if waiting_user:
                # Pair the waiting user with the current user
                chat_room = waiting_user
                chat_room.member2 = member_detail
                chat_room.status = "MATCHED"
                chat_room.save()
            else:
                room_name = nickname + "'s Room"
                # No waiting user found, create a new chat room for the current user
                chat_room = ChatRoom.objects.create(
                    name=room_name, member1=member_detail
                )
                chat_room.status = "WAITING"
                chat_room.save()

            return Response(
                {
                    "message": "New Chat Initialized Successfully !",
                    "status": chat_room.status,
                    "user_id": user_id,
                    "nickname": nickname,
                    "room_id": chat_room.room_id,
                },
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CheckChatStatusAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, room_id):
        try:
            chat_room = ChatRoom.objects.get(room_id=room_id)
            return Response({"status": chat_room.status}, status=status.HTTP_200_OK)
        except ChatRoom.DoesNotExist:
            return Response({"status": "not found"}, status=status.HTTP_404_NOT_FOUND)


class ChatRoomAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, room_id):
        try:
            chat_room = ChatRoom.objects.get(room_id=room_id)
            serializer = ChatRoomSerializer(chat_room)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except ChatRoom.DoesNotExist:
            return Response({"message": "not found"}, status=status.HTTP_404_NOT_FOUND)


class SendChatMessageAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = SendChatMessageSerializer

    def get_member_id(self, user_id):
        return user_id.split("-")[1] if user_id else None

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid(raise_exception=True):
            validated_data = serializer.validated_data

            room_id = validated_data["room_id"]
            initiator_id = validated_data["initiator_id"]

            try:
                chat_room = ChatRoom.objects.get(room_id=room_id)
                if chat_room.status != "MATCHED":
                    return Response(
                        {"message": "Chat room has been ended."},
                        status=status.HTTP_404_NOT_FOUND,
                    )

            except ChatRoom.DoesNotExist:
                return Response(
                    {"message": "Chat room not found."}, status=status.HTTP_404_NOT_FOUND
                )

            # Check if the initiator belongs to the specified chat room
            try:
                member1_id = self.get_member_id(chat_room.member1)
                member2_id = self.get_member_id(chat_room.member2)
            except (AttributeError, IndexError):
                return Response(
                    {"message": "Invalid format for initiator or member ID."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if initiator_id not in [member1_id, member2_id]:
                return Response(
                    {"message": "Initiator does not belong to this chat room."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Create the chat message within the chat room
            chat_message = ChatMessage.objects.create(
                chat=chat_room,
                initiator=initiator_id,
                message=validated_data["message"],
            )
            chat_message.save()

            return Response(
                {"message": "Message Sent Successfully."},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RoomInfoInfoView(APIView):
    serializer_class = ChatRoomInfoSerializer
    permission_classes = [AllowAny]

    def get(self, request, room_id):
        try:
            # Check if room_id is a valid UUID
            chat_room = ChatRoom.objects.get(room_id=room_id)
            serializer = self.serializer_class(chat_room)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except ChatRoom.DoesNotExist:
            return Response({"status": "not found"}, status=status.HTTP_404_NOT_FOUND)


class DisconnectChatAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, room_id):
        room = get_object_or_404(ChatRoom, room_id=room_id)
        room.status = "ENDED"
        room.ended_at = timezone.now()
        room.save()
        return Response("Disconnected", status=status.HTTP_200_OK)
