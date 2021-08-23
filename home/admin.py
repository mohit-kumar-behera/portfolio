from django.contrib import admin
from home.models import Profile, Technology

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'date_of_birth')

class TechnologyAdmin(admin.ModelAdmin):
    readonly_fields = ('upload_date',)
    list_display = ('name', 'upload_date')
    search_fields = ('name',)
    ordering = ('name',)

admin.site.register(Technology, TechnologyAdmin)
admin.site.register(Profile, ProfileAdmin)
