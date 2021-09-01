from home.api import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from home.helper import (
  create_200_response, create_404_response,
) 
from home.user import get_user, get_profile
from contact.models import Contact, SocialAccount
from contact.api.serializers import ContactSerializer, SocialAccountSerializer

from django.contrib.auth import get_user_model
User=get_user_model()

@api_view(['GET'])
def api_contact_view(request):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_contact = Contact.objects.filter(profile=profile)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = ContactSerializer(user_contact, many=True)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)
  

@api_view(['GET'])
def api_contact_detail_view(request, type):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_contact = Contact.objects.filter(profile=profile)
        user_contact__by_type = user_contact.get(type=type)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = ContactSerializer(user_contact__by_type, many=False)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_social_acccount_view(request):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        social_account = SocialAccount.objects.filter(profile=profile)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = SocialAccountSerializer(social_account, many=True)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_social_acccount_detail_view(request, type):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        social_account = SocialAccount.objects.filter(profile=profile)
        social_account__by_type = social_account.get(name=type)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = SocialAccountSerializer(social_account__by_type, many=False)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)