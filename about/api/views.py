from home.models import User
from contact.api import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from home.helper import (
  create_200_response, create_404_response,
  create_400_response
) 
from home.user import get_user, get_profile
from about.models import Education
from about.api.serializers import EducationSerializer


@api_view(['GET'])
def api_education_view(request):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_education = Education.objects.filter(profile=profile)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = EducationSerializer(user_education, many=True)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)