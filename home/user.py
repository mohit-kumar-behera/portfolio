from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from home.models import Profile
User = get_user_model()


def get_user():
  user=None
  try:
    user = User.objects.get(email=settings.USER_ACCOUNT_EMAIL)
  except User.DoesNotExist:
    pass
  else:
    if not (check_password(settings.USER_ACCOUNT_PASSWORD, user.password)):
      user = None
  return user


def get_profile(user=None):
  profile = None
  if not user:
    return profile
  try:
    profile = Profile.objects.get(user=user)
  except Profile.DoesNotExist:
    pass
  return profile


