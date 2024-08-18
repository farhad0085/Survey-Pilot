from rest_framework.generics import ListCreateAPIView
from poll.models import Poll
from poll.serializers import PollSerializer


class PollListCreateAPIView(ListCreateAPIView):
    
    serializer_class = PollSerializer

    def get_queryset(self):
        return Poll.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
