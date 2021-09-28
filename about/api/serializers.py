from rest_framework import serializers
from home.models import Profile
from home.api.serializers import UserSerializer
from about.models import Award, Education, Work, Skill


from contact.models import Contact, Address

class ShortBioSerializer(serializers.ModelSerializer):
  user = UserSerializer(many=False)
  other_info = serializers.SerializerMethodField()

  class Meta:
    model = Profile
    exclude = ('bio', 'mentor')
  
  def get_other_info(self, profile):
    age = profile.get_age()
    try:
      home_address = profile.address_set.get(type='home')
    except Address.DoesNotExist:
      home_address = None
    else:
      home_address = {
        'nationality': home_address.country,
        'locality': f'{home_address.city}, {home_address.state}',
        'url': home_address.mapURL
      }
    
    try:
      phone = profile.contact_set.get(type='phone')
    except Contact.DoesNotExist:
      phone = None
    else:
      phone = {
        'value': phone.value,
        'url': phone.url
      }
      
    return {
      'age': age,
      'address': home_address,
      'phone': phone
    }
    


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
  
