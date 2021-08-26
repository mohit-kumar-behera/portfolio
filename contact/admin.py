from django.contrib import admin
from contact.models import Contact, Address, SocialAccount, Message

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

class SocialAccountAdmin(admin.ModelAdmin):
    list_display = ('profile', 'name')
    list_filter = ('profile', 'name')
    search_fields = ('profile', 'name')
    ordering = ('profile',)

class MessageAdmin(admin.ModelAdmin):
    list_display = ('profile', 'name', 'subject', 'date_posted')
    list_filter = ('profile', 'date_posted')
    search_fields = ('profile', 'name', 'subject')
    ordering = ('-date_posted',)

admin.site.register(Contact, ContactAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(SocialAccount, SocialAccountAdmin)
admin.site.register(Message, MessageAdmin)