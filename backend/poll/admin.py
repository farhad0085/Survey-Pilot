from django.contrib import admin
from .models import Poll, Choice, Vote


@admin.register(Poll)
class PollAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'publish_at', 'expire_at', 'max_vote', 'user', 'collect_email')
    search_fields = ('name', 'description')
    list_filter = ('is_active', 'publish_at', 'expire_at')


@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('poll', 'text', 'type', 'get_vote_count')
    search_fields = ('text',)
    list_filter = ('type',)


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ('poll', 'choice', 'email', 'ip_address', 'user_agent')
    search_fields = ('email', 'ip_address')
    list_filter = ('poll', 'choice')
