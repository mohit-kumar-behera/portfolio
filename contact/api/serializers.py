from rest_framework import serializers
from contact.models import Contact, SocialAccount, Message


class ContactSerializer(serializers.ModelSerializer):
  profile = serializers.SerializerMethodField()
  type = serializers.SerializerMethodField()

  class Meta:
    model = Contact
    fields = '__all__'
  
  def get_profile(self, contact):
    return {
      'id': contact.profile.id,
      'username': contact.profile.user.username
    }
  
  def get_type(self, contact):
    return contact.get_type_display()


class SocialAccountSerializer(serializers.ModelSerializer):
  profile = serializers.SerializerMethodField()
  name = serializers.SerializerMethodField()

  class Meta:
    model = SocialAccount
    fields = '__all__'
  
  def get_profile(self, social_account):
    return {
      'id': social_account.profile.id,
      'username': social_account.profile.user.username
    }
  
  def get_name(self, social_account):
    return social_account.get_name_display()


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