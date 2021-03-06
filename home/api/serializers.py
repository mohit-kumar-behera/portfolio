from rest_framework import serializers
from django.contrib.auth import get_user_model
from home.models import (
  Profile, ProfileImage, 
  Technology, Mentor,
  MentorChannel
)
User=get_user_model()


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('email', 'username', 'first_name', 'last_name')


class ProfileSerializer(serializers.ModelSerializer):
  user = UserSerializer(many=False, read_only=True)
  age = serializers.SerializerMethodField()
  
  class Meta:
    model = Profile
    exclude = ('mentor',)
  
  def get_age(self, profile):
    age = profile.get_age()
    return age
  

class ProfileImageSerializer(serializers.ModelSerializer):
  profile = serializers.SerializerMethodField()
  
  class Meta:
    model = ProfileImage
    fields = '__all__'
  
  def get_profile(self, profile_img):
    return {
      'id': profile_img.profile.id,
      'username': profile_img.profile.user.username
    }


class TechnologySerializer(serializers.ModelSerializer):
  class Meta:
    model = Technology
    fields = '__all__'


class MentorChannelSerializer(serializers.ModelSerializer):
  class Meta:
    model = MentorChannel
    exclude = ('mentor',)


class MentorSerializer(serializers.ModelSerializer):
  channel = serializers.SerializerMethodField()

  class Meta:
    model = Mentor
    fields = '__all__'

  def get_channel(self, mentor):
    channel = mentor.mentorchannel_set.all()
    serializer = MentorChannelSerializer(channel, many=True)
    return serializer.data