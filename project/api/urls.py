from django.urls import path
from project.api import views

app_name = 'project_api'

urlpatterns = [
    path('list/tag/<str:tag>/s/<int:start>/e/<int:end>', views.api_project_list_view, name='get_project_list'),
    path('v/<slug:slug>', views.api_project_detail_view, name='get_project_detail'),
    path('v/<slug:slug>/images', views.api_project_detail_image_view, name='get_project_image'),
    path('v/<slug:slug>/tech-stack', views.api_project_detail_techstack_view, name='get_project_techstack'),
    path('image/<str:id>', views.api_project_image_detail_view, name='get_project_image_detail'),
]
