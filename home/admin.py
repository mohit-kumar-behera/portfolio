from django.contrib import admin
from home.models import (
    Profile, ProfileImage, 
    Technology, Mentor, 
    MentorChannel, QuickLink
)

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'date_of_birth')

class ProfileImageAdmin(admin.ModelAdmin):
    list_display = ('profile', 'name')


class TechnologyAdmin(admin.ModelAdmin):
    readonly_fields = ('upload_date',)
    list_display = ('name', 'upload_date')
    search_fields = ('name',)
    ordering = ('name',)

class MentorAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)


class MentorChannelAdmin(admin.ModelAdmin):
    list_display = ('mentor', 'name')
    list_filter = ('mentor', 'name')
    search_fields = ('mentor', 'name')
    ordering = ('mentor',)


class QuickLinkAdmin(admin.ModelAdmin):
    list_display = ('name', 'highlight')
    list_filter = ('highlight',)


admin.site.register(Technology, TechnologyAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(ProfileImage, ProfileImageAdmin)
admin.site.register(Mentor, MentorAdmin)
admin.site.register(MentorChannel, MentorChannelAdmin)
admin.site.register(QuickLink, QuickLinkAdmin)




