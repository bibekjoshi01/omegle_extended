from django.urls import path, include


urlpatterns = [
    path('chat/', include('src.chat.urls')),
]