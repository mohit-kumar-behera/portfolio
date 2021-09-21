from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from home.helper import (
  create_200_response, create_404_response,
  create_400_response
) 
from home.user import get_user, get_profile
from contact.models import Address, Contact, Message, SocialAccount
from contact.api.serializers import (
  AddressSerializer, ContactSerializer, 
  MessageSerializer, SocialAccountSerializer
)
import uuid, re

EMAIL_REGEX = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
VALID_FIELD_GUIDE = {
  'Name': {
    'minlength': 2,
    'maxlength': 80,
    'help_text': 'Name must be between 2 to 80 characters'
  },
  'Email': {
    'minlength': 2,
    'help_text': 'Must be a valid email address'
  },
  'Suject': {
    'minlength': 2,
    'maxlength': 255,
    'help_text': 'Name must be between 2 to 255 characters'
  },
  'Message': {
    'minlength': 2,
  }
}

# Check validity of fields
def isValidData(data_obj):
  valid = True
  for field in data_obj:
    if len(data_obj.get(field)) < 2:
      valid = False
      break
  if len(data_obj.get('name')) > 80 or len(data_obj.get('subject')) > 255:
    valid = False
  return valid and re.fullmatch(EMAIL_REGEX, data_obj.get('email'))


@api_view(['GET'])
def api_contact_view(request):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_contact = Contact.objects.filter(profile=profile)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = ContactSerializer(user_contact, many=True)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)
  

@api_view(['GET'])
def api_contact_detail_view(request, type):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_contact = Contact.objects.filter(profile=profile)
        user_contact__by_type = user_contact.get(type=type)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = ContactSerializer(user_contact__by_type, many=False)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_social_acccount_view(request):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_social_account = SocialAccount.objects.filter(profile=profile)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = SocialAccountSerializer(user_social_account, many=True)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_social_acccount_detail_view(request, type):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_social_account = SocialAccount.objects.filter(profile=profile)
        user_social_account__by_type = user_social_account.get(name=type)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = SocialAccountSerializer(user_social_account__by_type, many=False)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_address_view(request):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_address = Address.objects.filter(profile=profile)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = AddressSerializer(user_address, many=True)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_address_detail_view(request, type):
  profile = get_profile(user=get_user())
  if request.method == 'GET':
    if profile:
      try:
        user_address = Address.objects.filter(profile=profile)
        user_address__by_type = user_address.get(type=type)
      except:
        response = create_404_response()
        return Response(response, status=status.HTTP_404_NOT_FOUND)
      else:
        serializer = AddressSerializer(user_address__by_type, many=False)
        response = create_200_response(data=serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)


from django.views.decorators.csrf import csrf_exempt
@api_view(['POST'])
# @csrf_exempt
def api_send_message_view(request):
  profile = get_profile(user=get_user())
  print(profile)
  if request.method == 'POST':
    if profile:
      data_obj = request.data
      if not isValidData(data_obj):
        response = create_400_response(data=VALID_FIELD_GUIDE)
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
      try:
        message_obj = Message.objects.create(
          profile=profile,
          name=data_obj.get('name'),
          email=data_obj.get('email'),
          subject=data_obj.get('subject'),
          message=data_obj.get('message')
        )
      except:
        response = create_400_response(data=VALID_FIELD_GUIDE)
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
      else:
        curr_message_entry = Message.objects.get(id=uuid.UUID(str(message_obj.id)))
        serializer = MessageSerializer(curr_message_entry, many=False)
        response = create_200_response(serializer.data)
        return Response(response, status=status.HTTP_201_CREATED)
    response = create_404_response()
    return Response(response, status=status.HTTP_404_NOT_FOUND)

