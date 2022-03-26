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
  short_description = serializers.SerializerMethodField('get_description')

  class Meta:
    model = Project
    fields = '__all__'
  
  def get_profile(self, project):
    return {
      'id': project.profile.id,
      'username': project.profile.user.username
    }
  
  def get_description(self, project):
    return project.get_short_description()


class ProjectListSerializer(serializers.ModelSerializer):
  tech_stack = TechnologySerializer(many=True)
  thumbnail = ProjectImageSerializer(many=False)
  url = serializers.SerializerMethodField()
  description = serializers.SerializerMethodField()

  class Meta:
    model = Project
    fields = ('name', 'thumbnail', 'tech_stack', 'url', 'description', 'highlight')

  def get_url(self, project):
    return project.get_absolute_url()

  def get_description(self, project):
    return project.get_short_description()