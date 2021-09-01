from rest_framework import serializers
from contact.models import Contact, SocialAccount, Message


class ContactSerializer(serializers.ModelSerializer):
  profile = serializers.SerializerMethodField()

  class Meta:
    model = Contact
    fields = '__all__'
  
  def get_profile(self, contact):
    return {
      'id': contact.profile.id,
      'username': contact.profile.user.username
    }


class SocialAccountSerializer(serializers.ModelSerializer):
  profile = serializers.SerializerMethodField()

  class Meta:
    model = SocialAccount
    fields = '__all__'
  
  def get_profile(self, social_account):
    return {
      'id': social_account.profile.id,
      'username': social_account.profile.user.username
    }


class MessageSerializer(serializers.ModelSerializer):
  profile = serializers.SerializerMethodField()

  class Meta:
    model = Message
    fields = '__all__' 
  
  def get_profile(self, message_obj):
    return {
      'id': message_obj.profile.id,
      'username': message_obj.profile.user.username
    }