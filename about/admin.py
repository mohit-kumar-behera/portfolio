from django.contrib import admin
from about.models import Skill, Award


class AwardAdmin(admin.ModelAdmin):
    list_display = ('profile', 'name')
    list_filter = ('name',)
    search_fields = ('name',)
    ordering = ('name',)

class SkillAdmin(admin.ModelAdmin):
    readonly_fields = ('last_updated',)
    list_display = ('profile', 'technology', 'rating', 'last_updated')
    list_filter = ('rating',)
    search_fields = ('technology',)
    ordering = ('technology',)


admin.site.register(Skill, SkillAdmin)
admin.site.register(Award, AwardAdmin)
