from django.contrib import admin
from contact.models import Contact

class ContactAdmin(admin.ModelAdmin):
    readonly_fields = ('last_updated',)
    list_display = ('profile', 'type', 'value')
    list_filter = ('profile', 'type')
    search_fields = ('profile', 'type')
    ordering = ('profile',)

admin.site.register(Contact, ContactAdmin)
