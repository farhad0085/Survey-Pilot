from django.db import models
from common.models import TrackingModel


class Survey(TrackingModel):
    name = models.CharField(max_length=50)
    description = models.TextField()
    # is_multiple_allowed = models.BooleanField("Can select more than one?", null=True, blank=True, default=False)

