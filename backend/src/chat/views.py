from django.db import transaction
from rest_framework import status
from django.utils import timezone
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404

from . serializers import (
    InitializeChatSerializer, SendChatMessageSerializer, ChatRoomSerializer
)
from . models import ChatRoom, ChatMessage


class InitializeChatAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = InitializeChatSerializer

    @transaction.atomic
    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={'request': request}
        )

        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
            
            user_id = data['user_id']
            user_name = data['user_name']

            # Matching Process will be here
            member1 = user_id

           # Check if there's a user waiting for a match
            waiting_user = ChatRoom.objects.filter(member2=None).first()

            if waiting_user:
                # Pair the waiting user with the current user
                chat_room = waiting_user
                chat_room.member2 = user_id
                chat_room.status = 'MATCHED'
                chat_room.save()
            else:
                # No waiting user found, create a new chat room for the current user
                chat_room = ChatRoom.objects.create(name=user_name, member1=user_id)
                chat_room.status = 'WAITING'
                chat_room.save()

            return Response(
                {
                    'message': 'New Chat Initialized Successfully !',
                    'status': chat_room.status,
                    'user_id': user_id,
                    'room_id': chat_room.room_id
                },
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CheckChatStatusAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, room_id):
        try:
            chat_room = ChatRoom.objects.get(room_id=room_id)
            return Response({'status': chat_room.status}, status=status.HTTP_200_OK)
        except ChatRoom.DoesNotExist:
            return Response({'status': 'not found'}, status=status.HTTP_404_NOT_FOUND)


class ChatRoomAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, room_id):
        try:
            chat_room = ChatRoom.objects.get(room_id=room_id)
            serializer = ChatRoomSerializer(chat_room)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except ChatRoom.DoesNotExist:
            return Response({'message': 'not found'}, status=status.HTTP_404_NOT_FOUND)


class SendChatMessageAPIView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = SendChatMessageSerializer

    def perform_create(self, serializer):
        room_id = serializer.validated_data['room_id']
        initiator = serializer.validated_data['initiator']

        # Check if the initiator belongs to the specified chat room
        try:
            chat_room = ChatRoom.objects.get(room_id=room_id)
            if initiator != chat_room.member1 and initiator != chat_room.member2:
                return Response(
                    {'message': 'Initiator does not belong to this chat room.'}, 
                    status=status.HTTP_BAD_REQUEST
                )
        except ChatRoom.DoesNotExist:
            return Response(
                {'message': 'Chat room not found.'}, 
                status=status.HTTP_NOT_FOUND
            )
        
       # Create the chat message within the chat room
        chat_message = ChatMessage.objects.create(
            chat=chat_room, initiator=initiator, 
            message=serializer.validated_data['message']
        )
        chat_message.save()
        return Response(
            {'message': 'Message Sent Successfully.'}, 
            status=status.HTTP_201_CREATED
        )


class DisconnectChatAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, room_id):
        room = get_object_or_404(ChatRoom, room_id=room_id)
        room.status = 'ENDED'
        room.ended_at = timezone.now()
        room.save()
        return Response('Disconnected', status=status.HTTP_200_OK)