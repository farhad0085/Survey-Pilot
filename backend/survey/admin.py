from django.contrib import admin
from .models import Survey, Question, Choice, Response, Answer


class SurveyAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    list_filter = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'question_type', 'survey', 'is_required', 'created_at', 'updated_at')
    search_fields = ('text', 'survey__title')
    list_filter = ('question_type', 'is_required', 'survey')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')


class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('text', 'question', 'created_at', 'updated_at')
    search_fields = ('text', 'question__text')
    list_filter = ('question',)
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')


class ResponseAdmin(admin.ModelAdmin):
    list_display = ('survey', 'submitted_at', 'created_at', 'updated_at')
    search_fields = ('survey__title',)
    list_filter = ('submitted_at', 'survey')
    ordering = ('-submitted_at',)
    readonly_fields = ('created_at', 'updated_at')


class AnswerAdmin(admin.ModelAdmin):
    list_display = ('response', 'question', 'text_answer', 'choice', 'created_at', 'updated_at')
    search_fields = ('response__survey__title', 'question__text', 'text_answer')
    list_filter = ('question', 'response')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')


# Register models with the admin site
admin.site.register(Survey, SurveyAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice, ChoiceAdmin)
admin.site.register(Response, ResponseAdmin)
admin.site.register(Answer, AnswerAdmin)
