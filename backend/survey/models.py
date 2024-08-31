from django.db import models
from common.models import TrackingModel
from django.utils import timezone
from survey.enums import QuestionType
from user.models import UserAccount


class Survey(TrackingModel):
    user = models.ForeignKey(UserAccount, related_name='surveys', on_delete=models.CASCADE, null=False, blank=False)
    title = models.CharField(max_length=200, null=False, blank=False)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title


class Question(TrackingModel):
    QUESTION_TYPES = [
        (QuestionType.SHORT_ANSWER, QuestionType.SHORT_ANSWER),
        (QuestionType.PARAGRAPH, QuestionType.PARAGRAPH),
        (QuestionType.MULTIPLE_CHOICE, QuestionType.MULTIPLE_CHOICE),
        (QuestionType.DROPDOWN, QuestionType.DROPDOWN),
        (QuestionType.CHECKBOX, QuestionType.CHECKBOX),
        (QuestionType.FILE_UPLOAD, QuestionType.FILE_UPLOAD),
        (QuestionType.LINEAR_SCALE, QuestionType.LINEAR_SCALE),
        (QuestionType.DATE, QuestionType.DATE),
        (QuestionType.TIME, QuestionType.TIME),
    ]
    survey = models.ForeignKey(Survey, related_name='questions', on_delete=models.CASCADE, null=False, blank=False)
    text = models.CharField(max_length=200, null=False, blank=False)
    question_type = models.CharField(max_length=50, choices=QUESTION_TYPES, null=False, blank=False)
    is_required = models.BooleanField(default=False, null=False, blank=False)
    help_text = models.TextField(blank=True, null=True)
    min_value = models.IntegerField(blank=True, null=True)
    max_value = models.IntegerField(blank=True, null=True)
    validation_regex = models.CharField(max_length=255, blank=True, null=True)
    validation_message = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.text


class Choice(TrackingModel):
    question = models.ForeignKey(Question, related_name='choices', on_delete=models.CASCADE, null=False, blank=False)
    text = models.CharField(max_length=200, null=False, blank=False)

    def __str__(self):
        return self.text


class Response(TrackingModel):
    survey = models.ForeignKey(Survey, related_name='responses', on_delete=models.CASCADE, null=False, blank=False)
    submitted_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    def __str__(self):
        return f"Response {self.id} for Survey {self.survey.title}"


class Answer(TrackingModel):
    response = models.ForeignKey(Response, related_name='answers', on_delete=models.CASCADE, null=False, blank=False)
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE, null=False, blank=False)
    text_answer = models.TextField(blank=True, null=True)
    choice = models.ForeignKey(Choice, related_name='answers', blank=True, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"Answer to Question {self.question.id} in Response {self.response.id}"
