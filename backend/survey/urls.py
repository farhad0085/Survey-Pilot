from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SurveyViewSet, QuestionViewSet, ChoiceViewSet, ResponseViewSet, AnswerViewSet


router = DefaultRouter()
router.register('surveys', SurveyViewSet)
router.register('questions', QuestionViewSet)
router.register('choices', ChoiceViewSet)
router.register('responses', ResponseViewSet)
router.register('answers', AnswerViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
