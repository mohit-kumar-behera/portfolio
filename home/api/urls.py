from django.urls import path
from home.api import views

app_name = 'user_api'

urlpatterns = [
    path('', views.api_user_detail_view, name="get_user_detail"),
    path('image/', views.api_user_image_view, name="get_user_image"),
]
