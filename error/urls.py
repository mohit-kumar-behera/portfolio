from django.urls import path
from django.urls import path
from . import views

app_name = 'error'

urlpatterns = [
    path('', views.error_page, name='error')
]