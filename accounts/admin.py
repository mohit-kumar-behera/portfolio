from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from accounts.forms import UserCreationForm, UserChangeForm
User = get_user_model()

class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    readonly_fields=('date_joined',)
    list_display = ('email', 'username', 'first_name', 'is_admin')
    list_filter = ('is_superuser',)
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_admin', 'is_superuser', 'is_staff')}),
        ('Date and Time', {'fields': ('date_joined',)}),
        ('Groups', {'fields': ('groups',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )
    search_fields = ('email', 'username', 'first_name')
    ordering = ('email',)
    filter_horizontal = ()



admin.site.register(User, UserAdmin)
