from django.urls import path
from . import views

app_name = 'project'

urlpatterns = [
    path('', views.redirect_to_all_projects, name='redirect_to_all_projects'),
    path('all/', views.all_projects, name='all_projects'),
]