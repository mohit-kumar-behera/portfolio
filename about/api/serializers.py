from rest_framework import serializers
from about.models import Education, Work


class EducationSerializer(serializers.ModelSerializer):
  profile = serializers.SerializerMethodField()
  tag = serializers.SerializerMethodField()
  year_span = serializers.SerializerMethodField()

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
  
  def get_year_span(self, education):
    return education.format_time_duration()


class WorkExperienceSerializer(serializers.ModelSerializer):
  profile = serializers.SerializerMethodField()

  class Meta:
    model = Work
    exclude = ('detail', 'start_date', 'end_date')
  
  def get_profile(self, education):
    return {
      'id': education.profile.id,
      'username': education.profile.user.username 
    }


class WorkExperienceDetailSerializer(serializers.ModelSerializer):
  year_span = serializers.SerializerMethodField()
  
  class Meta:
    model = Work
    exclude = ('profile',)
  
  def get_year_span(self, education):
    return education.format_time_duration()

  
