from django.contrib import admin
from home.models import ImageUploader

class ImageUploaderAdmin(admin.ModelAdmin):
    readonly_fields = ('upload_date',)
    list_display = ('name', 'type', 'upload_date', 'resolution')
    list_filter = ('type',)
    search_fields = ('type', 'name')
    ordering = ('-upload_date',)


admin.site.register(ImageUploader, ImageUploaderAdmin)
