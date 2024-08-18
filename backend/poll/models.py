from django.db import models
from common.models import TrackingModel
from django.utils import timezone
from poll.enums import ChoiceType
from user.models import UserAccount


class Poll(TrackingModel):
    name = models.CharField(max_length=50)
    description = models.TextField()
    is_active = models.BooleanField(null=True, blank=True, default=True)
    publish_at = models.DateTimeField(null=True, blank=True, default=timezone.now)
    expire_at = models.DateTimeField(null=True, blank=True)
    max_vote = models.IntegerField("Maximum number of vote", null=True, blank=True)
    user = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, null=True, blank=True)
    collect_email = models.BooleanField(null=True, blank=True, default=True)


class Choice(TrackingModel):

    TYPES = [
        [ChoiceType.TEXT, ChoiceType.TEXT],
        [ChoiceType.IMAGE, ChoiceType.IMAGE],
        [ChoiceType.AUDIO, ChoiceType.AUDIO],
        [ChoiceType.VIDEO, ChoiceType.VIDEO],
    ]
    text = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to='poll/images', null=True, blank=True)
    audio = models.FileField(upload_to='poll/audios', null=True, blank=True)
    video = models.FileField(upload_to='poll/videos', null=True, blank=True)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, null=True, blank=True)
    type = models.CharField(max_length=20, null=True, blank=True, choices=TYPES, default=ChoiceType.TEXT)

    @property
    def get_vote_count(self):
        return self.votes.count()


class Vote(TrackingModel):
    email = models.EmailField(null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, null=True, blank=True)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE, related_name="votes", null=True, blank=True)

