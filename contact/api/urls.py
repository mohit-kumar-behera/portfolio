from django.urls import path
from contact.api import views

app_name = 'contact_api'

urlpatterns = [
    path('', views.api_contact_view, name='get_contact'),
    path('tp/<str:type>/', views.api_contact_detail_view, name='get_contact_detail'),
    path('social-account/', views.api_social_acccount_view, name='get_social_account'),
    path('social-account/tp/<str:type>', views.api_social_acccount_detail_view, name='get_social_account_detail'),
    path('address/', views.api_address_view, name='get_address'),
    path('address/tp/<str:type>', views.api_address_detail_view, name='get_address_detail'),
    path('send-message/', views.api_send_message_view, name='post_send_message'),
]
