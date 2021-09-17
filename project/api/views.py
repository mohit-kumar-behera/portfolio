from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from home.helper import (
  create_200_response, create_404_response,
) 
from home.api.serializers import TechnologySerializer
from home.user import get_user, get_profile
from project.models import Project, ProjectImage
from project.api.serializers import ProjectDetailSerializer, ProjectImageSerializer

import uuid


@api_view(['GET'])
def api_project_detail_view(request, slug):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_project = Project.objects.filter(profile=profile)
        user_project_detail = user_project.get(slug=slug)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = ProjectDetailSerializer(user_project_detail, many=False)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_project_detail_techstack_view(request, slug):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_project = Project.objects.filter(profile=profile)
        user_project_detail = user_project.get(slug=slug)
        user_project_detail_techstack = user_project_detail.tech_stack.all()
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = TechnologySerializer(user_project_detail_techstack, many=True)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_project_detail_image_view(request, slug):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_project = Project.objects.filter(profile=profile)
        user_project_detail = user_project.get(slug=slug)
        user_project_detail_image = user_project_detail.projectimage_set.all()
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = ProjectImageSerializer(user_project_detail_image, many=True)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_project_image_detail_view(request, id):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_project_image_detail = ProjectImage.objects.get(id=uuid.UUID(str(id)))
      except ProjectImage.DoesNotExist:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = ProjectImageSerializer(user_project_image_detail, many=False)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)