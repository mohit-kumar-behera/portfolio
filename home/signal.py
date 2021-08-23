from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from home.models import Profile
User = get_user_model()

@receiver(post_save, sender=User)
def createUserProfile(sender, instance, created, *args, **kwargs):
    if created:
        try:
            Profile.objects.create(user=instance)
        except:
            pass

@receiver(post_save, sender=User)
def updateUserProfile(sender, instance, created, *args, **kwargs):
    if not created:
        instance.profile.save()