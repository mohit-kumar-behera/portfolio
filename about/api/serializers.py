from rest_framework import serializers
from about.models import Education


class EducationSerializer(serializers.ModelSerializer):
  profile = serializers.SerializerMethodField()
  tag = serializers.SerializerMethodField()

  class Meta:
    model = Education
    fields = '__all__'
  
  def get_profile(self, education):
    return {
      'id': education.profile.id,
      'username': education.profile.user.username 
    }
  
  def get_tag(self, education):
    return education.get_tag_display()