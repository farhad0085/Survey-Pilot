from rest_framework import serializers
from rest_framework.exceptions import NotFound, ValidationError
from poll.models import Choice, Poll, Vote


class ChoiceSerializer(serializers.ModelSerializer):
    vote_count = serializers.SerializerMethodField()
    can_edit = serializers.SerializerMethodField()

    class Meta:
        model = Choice
        fields = "__all__"

    def get_vote_count(self, obj):
        return obj.vote_count
    
    def get_can_edit(self, obj):
        return obj.can_edit


class PollSerializer(serializers.ModelSerializer):
    vote_count = serializers.SerializerMethodField()
    can_vote = serializers.SerializerMethodField()
    choices = serializers.SerializerMethodField()

    class Meta:
        model = Poll
        fields = "__all__"
        read_only_fields = ['user']

    def get_vote_count(self, obj):
        return obj.vote_count
    
    def get_can_vote(self, obj):
        return obj.can_vote

    def get_choices(self, obj):
        choices = obj.choices.all()
        return ChoiceSerializer(choices, many=True).data


class VoteSerializer(serializers.ModelSerializer):

    def validate(self, data):
        poll = data["poll"]
        choice = data["choice"]

        # make sure this choice is a choice of the provided poll
        if choice.poll != poll:
            raise ValidationError("Invalid choice")
        return data
    
    class Meta:
        model  = Vote
        fields = "__all__"
        extra_kwargs = {
            'poll': {'required': True, 'allow_null': False},
            'choice': {'required': True, 'allow_null': False},
        }
