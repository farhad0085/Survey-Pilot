from django.db import models
from django.utils import timezone
from common.models import TrackingModel
from poll.enums import ChoiceType
from user.models import UserAccount
from django.utils import timezone


class Poll(TrackingModel):
    title = models.CharField(max_length=500)
    description = models.TextField()
    is_active = models.BooleanField(null=True, blank=True, default=True)
    publish_at = models.DateTimeField(null=True, blank=True, default=timezone.now)
    expire_at = models.DateTimeField(null=True, blank=True)
    max_vote = models.IntegerField("Maximum number of vote", null=True, blank=True)
    user = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, null=True, blank=True)
    collect_email = models.BooleanField("Do you want to collect email?", null=True, blank=True, default=True)
    show_result = models.BooleanField("Show result after vote?", null=True, blank=True, default=True)
    featured = models.BooleanField("Want to show in homepage?", null=True, blank=True, default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title
    
    @property
    def is_expired(self):
        if self.expire_at:
            return timezone.now() >= self.expire_at
        return False

    @property
    def can_vote(self):
        if not self.is_active:
            return False
        if self.is_expired:
            return False
        if self.max_vote:
            if self.vote_count >= self.max_vote:
                return False
        return True

    @property
    def vote_count(self):
        return self.votes.count()


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
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="choices", null=True, blank=True)
    type = models.CharField(max_length=20, null=True, blank=True, choices=TYPES, default=ChoiceType.TEXT)
    index = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ['index']
        unique_together = ['poll', 'index']

    @property
    def vote_count(self):
        return self.votes.count()
    
    @property
    def can_edit(self):
        # the creator cannot edit the choice if someone voted it already
        return not bool(self.vote_count)


class Vote(TrackingModel):
    email = models.EmailField(null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="votes", null=True, blank=True)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE, related_name="votes", null=True, blank=True)

