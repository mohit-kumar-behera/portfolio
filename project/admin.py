from django.contrib import admin
from django.contrib.admin.options import ModelAdmin
from project.models import Mentor, MentorChannel

class MentorAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)


class MentorChannelAdmin(admin.ModelAdmin):
    list_display = ('mentor', 'name')
    list_filter = ('mentor', 'name')
    search_fields = ('menor', 'name')
    ordering = ('mentor',)


admin.site.register(Mentor, ModelAdmin)
admin.site.register(MentorChannel, MentorChannelAdmin)
