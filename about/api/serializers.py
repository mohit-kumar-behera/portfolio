from rest_framework import serializers
from about.models import Award, Education, Work, Skill


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
  
  def get_profile(self, experience):
    return {
      'id': experience.profile.id,
      'username': experience.profile.user.username 
    }


class WorkExperienceDetailSerializer(serializers.ModelSerializer):
  year_span = serializers.SerializerMethodField()
  
  class Meta:
    model = Work
    exclude = ('profile',)
  
  def get_year_span(self, experience):
    return experience.format_time_duration()

  
class SkillSerializer(serializers.ModelSerializer):
  profile = serializers.SerializerMethodField()
  technology = serializers.SerializerMethodField()

  class Meta:
    model = Skill
    fields = '__all__'
  
  def get_profile(self, skill):
    return {
      'id': skill.profile.id,
      'username': skill.profile.user.username
    }
  
  def get_technology(self, skill):
    return skill.technology.name


class AwardSerializer(serializers.ModelSerializer):
  profile = serializers.SerializerMethodField()

  class Meta:
    model = Award
    fields = '__all__'

  def get_profile(self, award):
    return {
      'id': award.profile.id,
      'username': award.profile.user.username
    }
  
