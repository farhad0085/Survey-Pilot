from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from common.views import StandardAPIView
from poll.models import Choice, Poll, Vote
from poll.paginations import VotePagination
from poll.permissions import IsPollOwner
from poll.serializers import ChoiceSerializer, PollSerializer, VoteSerializer


class PollListCreateAPIView(ListCreateAPIView):
    serializer_class = PollSerializer

    def get_queryset(self):
        return Poll.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FeaturedPollListAPIView(ListAPIView):
    serializer_class = PollSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        polls = Poll.objects.all()
        return [poll for poll in polls if poll.can_vote]


class PollRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsPollOwner]
    serializer_class = PollSerializer
    queryset = Poll.objects.all()
    
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
                Choice.objects.create(
                    text=choice.get('text'),
                    poll=instance,
                    index=choice_index
                )

        return Response(serializer.data)


class PollVoteRetrieveAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsPollOwner]
    queryset = Poll.objects.all()

    def retrieve(self, request, *args, **kwargs):
        poll_obj = self.get_object()

        # Apply pagination
        paginator = VotePagination()
        paginated_votes = paginator.paginate_queryset(poll_obj.votes.all(), request)

        # serialize votes data
        votes = [{
            "id": v.id,
            "email": v.email,
            "ip_address": v.ip_address,
            "user_agent": v.user_agent,
            "choice": ChoiceSerializer(v.choice).data,
            "updated_at": v.updated_at
        } for v in paginated_votes]

        data = {
            "votes": {
                "total_count": paginator.page.paginator.count,
                "current_page": paginator.page.number,
                "page_size": paginator.page.paginator.per_page,
                "data": votes
            }
        }
        return Response(data)


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
        
        poll = serializer.validated_data["poll"]
        choice = serializer.validated_data["choice"]
        email = serializer.validated_data.get("email")

        if not poll.can_vote:
            return self.send_400("Voting is disabled for this poll.")

        # we won't let a user submit multiple choice
        # even if he does, we'll just update his choice
        # instead of creating a new one
        if poll.collect_email:
            vote_obj = Vote.objects.filter(
                poll=poll,
                ip_address=ip_address,
                user_agent=user_agent,
                email=email
            ).first()
        else:
            vote_obj = Vote.objects.filter(
                poll=poll,
                ip_address=ip_address,
                user_agent=user_agent,
            ).first()
        
        if vote_obj:
            vote_obj.choice = choice
            vote_obj.save()
        else:
            # otherwise simply create it
            vote_obj = serializer.save()

        # return Poll data
        return self.send_200(PollSerializer(poll).data)
