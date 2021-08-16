from django.urls import path
from . import views

app_name = 'home'

urlpatterns = [
    path('', views.home_view, name='home'),
    path('fetch-mohit/', views.fetch_mohit, name='fetch_mohit')
]