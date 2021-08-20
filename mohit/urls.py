from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import handler400, handler403, handler404, handler500

urlpatterns = [
    path('admin/', admin.site.urls),
    path('contact/', include('contact.urls')),
    path('about/', include('about.urls')),
    path('', include('home.urls')),
    path('project/', include('project.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


# ERROR HANDLER
handler400 = 'error.views.error_400'
handler403 = 'error.views.error_403'
handler404 = 'error.views.error_404'
handler500 = 'error.views.error_500'