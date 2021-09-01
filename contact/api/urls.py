from django.urls import path
from contact.api import views

app_name = 'contact_api'

urlpatterns = [
    path('', views.api_contact_view, name='get_contact'),
    path('tp/<str:type>/', views.api_contact_detail_view, name='get_contact_detail'),
    path('social-account/', views.api_social_acccount_view, name='get_social_account'),
    path('social-account/tp/<str:type>', views.api_social_acccount_detail_view, name='get_social_account_detail'),
]
