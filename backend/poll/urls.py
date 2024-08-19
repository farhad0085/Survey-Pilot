from django.urls import path
from poll.views import *


urlpatterns = [
    path('polls/', PollListCreateAPIView.as_view()),
    path('polls/<str:pk>/', PollRetrieveUpdateDestroyAPIView.as_view()),
    path('vote/', VoteAPIView.as_view()),
]
