from django.contrib import admin
from project.models import Project, ProjectImage

class ProjectImageInline(admin.StackedInline):
    model = ProjectImage
    extra = 5


class ProjectAdmin(admin.ModelAdmin):
    readonly_fields = ('date_added', 'date_updated')
    list_display = ('profile', 'name', 'slug', 'date_updated')
    list_filter = ('profile', 'name')
    search_fields = ('profile', 'name',)
    prepopulated_fields = {
        'slug': ('name',)
    }
    inlines = [ProjectImageInline]


class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ('project', 'name')
    list_filter = ('project',)
    search_fields = ('project', 'name')
    ordering = ('project',)


admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectImage, ProjectImageAdmin)