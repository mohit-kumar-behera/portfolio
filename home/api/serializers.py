from rest_framework import serializers
from django.contrib.auth import get_user_model
from home.models import Profile, ProfileImage
User=get_user_model()


import datetime

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['email', 'username', 'first_name', 'last_name']
  

class ProfileImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProfileImage
    fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
  user = UserSerializer(many=False, read_only=True)
  profile_image = serializers.SerializerMethodField()
  age = serializers.SerializerMethodField()
  
  class Meta:
    model = Profile
    # fields = '__all__'
    exclude = ['mentor']

  def get_profile_image(self, profile):
    profile_image = profile.profileimage
    serializer = ProfileImageSerializer(profile_image, many=False, read_only=True)
    return serializer.data
  
  def get_age(self, profile):
    age = profile.get_age()
    return age