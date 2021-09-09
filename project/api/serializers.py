from rest_framework import serializers
from home.api.serializers import TechnologySerializer
from project.models import Project, ProjectImage


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

  class Meta:
    model = Project
    fields = '__all__'
  
  def get_profile(self, project):
    return {
      'id': project.profile.id,
      'username': project.profile.user.username
    }