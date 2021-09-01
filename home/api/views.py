from home.api import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from home.user import get_user
from home.api.serializers import ProfileSerializer

def create_response_obj(ok, data=None, error=None):
  return {
    'ok': ok,
    'data': data,
    'error': error
  }

@api_view(['GET'])
def api_user_detail_view(request):
  _, profile = get_user()
  if request.method == 'GET':
    if profile:
      serializer = ProfileSerializer(profile, many=False)
      response = create_response_obj(True, serializer.data, None)
      return Response(response, status=status.HTTP_200_OK)
    
    response = create_response_obj(False, None, {
      'code': 404,
      'message': 'Profile Doesnot Exists'
    })
    return Response(response, status=status.HTTP_404_NOT_FOUND)
  
  response = create_response_obj(False, None, {
    'code': 405,
    'message': 'Method not Allowed!'
  })
  return Response(status.HTTP_405_METHOD_NOT_ALLOWED)