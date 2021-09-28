from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from home.helper import (
  create_200_response, create_404_response,
  create_400_response
) 
from home.user import get_user, get_profile
from about.models import Award, Education, Work, Skill
from about.api.serializers import (
  EducationSerializer, WorkExperienceSerializer,
  WorkExperienceDetailSerializer, SkillSerializer,
  AwardSerializer, ShortBioSerializer
)


@api_view(['GET'])
def api_user_short_bio_view(request):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      serializer = ShortBioSerializer(profile, many=False)
      response = create_200_response(serializer.data)
      return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_education_view(request):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_education = Education.objects.filter(profile=profile).order_by('-end_date')
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = EducationSerializer(user_education, many=True)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_experience_view(request):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_work_experience = Work.objects.filter(profile=profile).order_by('end_date')
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = WorkExperienceSerializer(user_work_experience, many=True)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_experience_detail_view(request, company):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_work_experience = Work.objects.filter(profile=profile)
        user_work_experience_detail = user_work_experience.get(name__iexact=company)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = WorkExperienceDetailSerializer(user_work_experience_detail, many=False)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_skill_view(request):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_skill = Skill.objects.filter(profile=profile)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = SkillSerializer(user_skill, many=True)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_award_view(request):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_awards = Award.objects.filter(profile=profile)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND) 
      else:
        serializer = AwardSerializer(user_awards, many=True)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_award_detail_view(request, id):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_awards = Award.objects.filter(profile=profile)
        user_awards_detail = user_awards.get(id=id)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = AwardSerializer(user_awards_detail, many=False)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)