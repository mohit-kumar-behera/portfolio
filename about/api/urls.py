from django.conf.urls import url
from django.urls import path
from about.api import views

app_name = 'about_api'

urlpatterns = [
    path('education/', views.api_education_view, name='get_education')
]
