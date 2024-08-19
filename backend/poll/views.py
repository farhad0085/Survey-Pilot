from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from common.views import StandardAPIView
from poll.models import Choice, Poll
from poll.serializers import PollSerializer, VoteSerializer


class PollListCreateAPIView(ListCreateAPIView):
    
    serializer_class = PollSerializer

    def get_queryset(self):
        return Poll.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PollRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = PollSerializer
    queryset = Poll.objects.all()
    
    def get_queryset(self):
        return Poll.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        # first remove all choices of this poll
        # then we'll assign them again
        old_choices = instance.choices.all()
        for choice in old_choices:
            choice.poll = None
            choice.save()
        
        # assign choices again, if exists, update, otherwise create
        choices = request.data.pop('choices', [])
        for choice in choices:
            choice_index = choice.get('index')
            choice_id = choice.get('id')
            if choice_id:
                choice_obj = Choice.objects.filter(id=choice_id).first()
                if choice_obj:
                    choice_obj.text = choice.get('text')
                    choice_obj.index = choice_index
                    choice_obj.poll = instance
                    choice_obj.save()
            else:
                # create new
                if choice_index:
                    Choice.objects.create(
                        text=choice.get('text'),
                        poll=instance,
                        index=choice_index
                    )

        return Response(serializer.data)


class VoteAPIView(StandardAPIView):

    permission_classes = [AllowAny]

    def get_client_ip(self):
        request = self.request
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
    
    def get_user_agent(self):
        return self.request.META['HTTP_USER_AGENT']

    def post(self, request):
        user_agent = self.get_user_agent()
        ip_address = self.get_client_ip()
        data = {
            **request.data,
            "user_agent": user_agent,
            "ip_address": ip_address,
        }
        serializer = VoteSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        vote = serializer.save()

        # return Poll data
        return self.send_200(PollSerializer(vote.poll).data)
