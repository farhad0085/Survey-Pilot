from django.urls import path
from poll.views import *


urlpatterns = [
    path('polls/', PollListCreateAPIView.as_view()),
]
