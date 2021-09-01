from django.urls import path
from home.api import views

app_name = 'home-api'

urlpatterns = [
    path('', views.api_user_detail_view, name="user_detail"),
]
