from django.contrib import admin
from home.models import ImageUploader, Technology

class ImageUploaderAdmin(admin.ModelAdmin):
    readonly_fields = ('upload_date',)
    list_display = ('name', 'type', 'upload_date', 'resolution')
    list_filter = ('type',)
    search_fields = ('type', 'name')
    ordering = ('-upload_date',)

class TechnologyAdmin(admin.ModelAdmin):
    readonly_fields = ('upload_date',)
    list_display = ('name', 'upload_date')
    search_fields = ('name',)
    ordering = ('name',)


admin.site.register(ImageUploader, ImageUploaderAdmin)
admin.site.register(Technology, TechnologyAdmin)
