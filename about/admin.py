from django.contrib import admin
from about.models import Skill


class SkillAdmin(admin.ModelAdmin):
    readonly_fields = ('last_updated',)
    list_display = ('user', 'technology', 'rating', 'last_updated')
    list_filter = ('rating',)
    search_fields = ('technology',)
    ordering = ('technology',)


admin.site.register(Skill, SkillAdmin)
