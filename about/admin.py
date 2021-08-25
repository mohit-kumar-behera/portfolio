from django.contrib import admin
from about.models import Skill, Award, Education, Work


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


class EducationAdmin(admin.ModelAdmin):
    list_display = ('profile', 'name', 'start_date', 'end_date', 'tag')
    list_filter = ('tag',)
    search_fields = ('name', 'tag')
    ordering = ('start_date',)


class WorkAdmin(admin.ModelAdmin):
    list_display = ('profile', 'name', 'start_date', 'end_date', 'position')
    list_filter = ('name', 'position',)
    search_fields = ('name', 'position')
    ordering = ('start_date',)


admin.site.register(Skill, SkillAdmin)
admin.site.register(Award, AwardAdmin)
admin.site.register(Education, EducationAdmin)
admin.site.register(Work, WorkAdmin)