from django.http import response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from home.models import ProfileImage, Technology, Mentor
from home.helper import (
  create_200_response, create_404_response,
) 
from home.user import get_user, get_profile
from home.api.serializers import (
  MentorSerializer, ProfileSerializer, 
  ProfileImageSerializer, TechnologySerializer
)

import uuid


@api_view(['GET'])
def api_user_detail_view(request):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      serializer = ProfileSerializer(profile, many=False)
      if serializer:
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_user_image_view(request):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        profile_image = ProfileImage.objects.get(profile=profile)
      except ProfileImage.DoesNotExist:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = ProfileImageSerializer(profile_image, many=False)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_technology_view(request):
  if request.method == 'GET':
    technology = Technology.objects.all()
    serializer = TechnologySerializer(technology, many=True)
    response = create_200_response(serializer.data)
    return Response(response, status=status.HTTP_200_OK)


@api_view(['GET'])
def api_user_mentor_view(request):
  if request.method == 'GET':
    mentor = Mentor.objects.all()
    serializer = MentorSerializer(mentor, many=True)
    response = create_200_response(serializer.data)
    return Response(response, status=status.HTTP_200_OK)


@api_view(['GET'])
def api_user_mentor_detail_view(request, id):
  if request.method == 'GET':
    try:
      mentor_detail = Mentor.objects.get(id=uuid.UUID(str(id)))
    except Mentor.DoesNotExist:
      response = create_404_response()
      return Response(response, status=status.HTTP_404_NOT_FOUND)
    else:
      serializer = MentorSerializer(mentor_detail, many=False)
      response = create_200_response(data=serializer.data)
      return Response(response, status=status.HTTP_200_OK)