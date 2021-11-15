from rest_framework import serializers
from home.api.serializers import TechnologySerializer
from project.models import Project, ProjectImage
import re


class ProjectImageSerializer(serializers.ModelSerializer):
  project = serializers.SerializerMethodField()

  class Meta:
    model = ProjectImage
    fields = '__all__'

  def get_project(self, project_image):
    return {
      'id': project_image.project.id,
      'name': project_image.project.name
    }


class ProjectDetailSerializer(serializers.ModelSerializer):
  tech_stack = TechnologySerializer(many=True)
  thumbnail = ProjectImageSerializer(many=False)
  profile = serializers.SerializerMethodField()
  short_description = serializers.SerializerMethodField()

  class Meta:
    model = Project
    fields = '__all__'
  
  def get_profile(self, project):
    return {
      'id': project.profile.id,
      'username': project.profile.user.username
    }

  def get_short_description(self, project):
    markup_safe_text = re.sub('<[^<>]+>', '', project.description)
    short_text = ". ".join(markup_safe_text.split(". ")[:6])
    return short_text + "."


class ProjectListSerializer(serializers.ModelSerializer):
  tech_stack = TechnologySerializer(many=True)
  thumbnail = ProjectImageSerializer(many=False)
  url = serializers.SerializerMethodField()
  description = serializers.SerializerMethodField()

  class Meta:
    model = Project
    fields = ('name', 'thumbnail', 'tech_stack', 'url', 'description')

  def get_url(self, project):
    return project.get_absolute_url()

  def get_description(self, project):
    return re.sub('<[^<>]+>', '', project.description[:120]) + '...'