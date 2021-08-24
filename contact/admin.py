from django.contrib import admin
from contact.models import Contact, Address

class ContactAdmin(admin.ModelAdmin):
    readonly_fields = ('last_updated', 'url')
    list_display = ('profile', 'type', 'value')
    list_filter = ('profile', 'type')
    search_fields = ('profile', 'type')
    ordering = ('profile',)


class AddressAdmin(admin.ModelAdmin):
    list_display = ('profile', 'type', 'city', 'state')
    list_filter = ('type', 'city', 'district', 'state')
    search_fields = ('profile', 'type', 'city', 'district', 'state')
    ordering = ('state',)

admin.site.register(Contact, ContactAdmin)
admin.site.register(Address, AddressAdmin)
