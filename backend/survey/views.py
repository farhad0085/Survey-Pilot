from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from .models import Survey, Question, Choice, Response, Answer
from .serializers import SurveySerializer, QuestionSerializer, ChoiceSerializer, ResponseSerializer, AnswerSerializer
from .permissions import IsObjectOwner


class SurveyViewSet(viewsets.ModelViewSet):
    serializer_class = SurveySerializer
    permission_classes = [IsAuthenticated, IsObjectOwner]
    queryset = Survey.objects.all()

    def get_queryset(self):
        return Survey.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated, IsObjectOwner]
    queryset = Question.objects.all()

    def get_queryset(self):
        user = self.request.user
        surveys = Survey.objects.filter(user=user)
        return Question.objects.filter(survey__in=surveys)


class ChoiceViewSet(viewsets.ModelViewSet):
    serializer_class = ChoiceSerializer
    permission_classes = [IsAuthenticated, IsObjectOwner]
    queryset = Choice.objects.all()

    def get_queryset(self):
        user = self.request.user
        surveys = Survey.objects.filter(user=user)
        questions = Question.objects.filter(survey__in=surveys)
        return Choice.objects.filter(question__in=questions)


class ResponseViewSet(viewsets.ModelViewSet):
    serializer_class = ResponseSerializer
    permission_classes = [IsAuthenticated, IsObjectOwner]
    queryset = Response.objects.all()

    def get_queryset(self):
        user = self.request.user
        surveys = Survey.objects.filter(user=user)
        return Response.objects.filter(survey__in=surveys)

    def perform_create(self, serializer):
        survey_id = self.request.data.get('survey')
        if Survey.objects.filter(pk=survey_id, user=self.request.user).exists():
            serializer.save(survey_id=survey_id)
        else:
            raise ValidationError("You do not have permission to respond to this survey.")


class AnswerViewSet(viewsets.ModelViewSet):
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated, IsObjectOwner]
    queryset = Answer.objects.all()

    def get_queryset(self):
        user = self.request.user
        surveys = Survey.objects.filter(user=user)
        responses = Response.objects.filter(survey__in=surveys)
        return Answer.objects.filter(response__in=responses)
