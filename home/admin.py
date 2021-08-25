from django.contrib import admin
from home.models import Profile, Technology, Mentor, MentorChannel

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'date_of_birth')

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

admin.site.register(Technology, TechnologyAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Mentor, MentorAdmin)
admin.site.register(MentorChannel, MentorChannelAdmin)




