from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    InitializeChatAPIView,
    CheckChatStatusAPIView,
    ChatRoomAPIView,
    SendChatMessageAPIView,
    DisconnectChatAPIView,
)

router = DefaultRouter()

urlpatterns = [
    path("initialize", InitializeChatAPIView.as_view(), name="initialize_chat"),
    path(
        "status/<str:room_id>",
        CheckChatStatusAPIView.as_view(),
        name="check_chat_status",
    ),
    path("messages/<str:room_id>", ChatRoomAPIView.as_view(), name="chat_room_info"),
    path("send/message", SendChatMessageAPIView.as_view(), name="send_chat_message"),
    path(
        "disconnect/<str:room_id>",
        DisconnectChatAPIView.as_view(),
        name="disconnect_chat",
    ),
]
