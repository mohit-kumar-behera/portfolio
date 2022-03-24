from django.urls import path
from . import views

app_name = 'project'

urlpatterns = [
    path('', views.my_portfolio, name='my_portfolio'),
    path('v/', views.redirect_to_portfolio, name='redirect_to_portfolio'),
    path('all/', views.all_projects, name='all_projects'),
    path('highlight/', views.highlighted_projects, name='highlighted_projects'),
    path('v/<slug:slug>/', views.view_project, name='view_project'),
]