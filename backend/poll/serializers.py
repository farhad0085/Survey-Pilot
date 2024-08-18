from rest_framework import serializers
from poll.models import Choice, Poll


class ChoiceSerializer(serializers.ModelSerializer):
    vote_count = serializers.SerializerMethodField()
    class Meta:
        model = Choice
        fields = "__all__"

    def get_vote_count(self, obj):
        return obj.vote_count


class PollSerializer(serializers.ModelSerializer):
    vote_count = serializers.SerializerMethodField()
    choices = serializers.SerializerMethodField()

    class Meta:
        model = Poll
        fields = "__all__"
        read_only_fields = ['user']

    def get_vote_count(self, obj):
        return obj.vote_count

    def get_choices(self, obj):
        choices = obj.choices.all()
        return ChoiceSerializer(choices, many=True).data
