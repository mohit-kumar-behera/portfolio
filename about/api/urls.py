from django.conf.urls import url
from django.urls import path
from about.api import views

app_name = 'about_api'

urlpatterns = [
    path('education/', views.api_education_view, name='get_education'),
    path('work-experience/', views.api_experience_view, name='get_experience'),
    path('work-experience/c/<str:company>', views.api_experience_detail_view, name='get_experience_detail'),
    path('skill/', views.api_skill_view, name='get_skill'),
    path('award/', views.api_award_view, name='get_awards'),
    path('award/<str:id>', views.api_award_detail_view, name='get_awards_detail'),
]
