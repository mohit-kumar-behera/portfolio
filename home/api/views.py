from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from home.models import ProfileImage
from home.helper import (
  create_200_response, create_404_response,
) 
from home.user import get_user, get_profile
from home.api.serializers import ProfileSerializer, ProfileImageSerializer



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
