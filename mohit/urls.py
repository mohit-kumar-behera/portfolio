from django.contrib import admin
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('contact/', include('contact.urls')),
    path('about/', include('about.urls')),
    path('', include('home.urls')),
    path('project/', include('project.urls')),

    path('error/', include('error.urls')),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


# ERROR HANDLER
# from django.conf.urls import handler400, handler403, handler404, handler500

# handler400 = 'err.views.err_400'
# handler403 = 'err.views.err_403'
# handler404 = 'err.views.err_404'
# handler500 = 'err.views.err_500'