from django.contrib import admin
from .models import Poll, Choice, Vote


@admin.register(Poll)
class PollAdmin(admin.ModelAdmin):
    list_display = ('title', 'publish_at', 'expire_at', 'max_vote', 'user', 'collect_email', 'vote_count', 'is_active',)
    search_fields = ('title', 'description')
    list_filter = ('is_active', 'publish_at', 'expire_at')


@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('poll', 'text', 'type', 'vote_count', 'index')
    search_fields = ('text',)
    list_filter = ('type',)


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ('poll', 'choice', 'email', 'ip_address', 'user_agent')
    search_fields = ('email', 'ip_address')
    list_filter = ('poll', 'choice')
