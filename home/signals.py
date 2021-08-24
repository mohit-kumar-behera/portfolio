from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from home.models import Profile
from home.helper import get_img, save_img
from home.config import THUMBNAIL_DIM, IMAGE_RESOLUTION
User = get_user_model()


@receiver(post_save, sender=User)
def createUserProfile(sender, instance, created, **kwargs):
    if created:
        try:
            Profile.objects.create(user=instance)
        except:
            pass

@receiver(post_save, sender=User)
def updateUserProfile(sender, instance, created, **kwargs):
    if not created and instance.profile:
        instance.profile.save()

@receiver(post_delete, sender=Profile)
def deleteUser(sender, instance, **kwargs):
    instance.user and instance.user.delete()

def compress_image(sender, instance, created, **kwargs):
    if created:
        thumbnail = getattr(instance, '_thumbnail', False)
        imgH = get_img(instance.image_high_res)
        imgL = get_img(instance.image_low_res)

        if thumbnail:
            if imgL.width > THUMBNAIL_DIM and imgL.height > THUMBNAIL_DIM:
                imgL.thumbnail((THUMBNAIL_DIM, THUMBNAIL_DIM))
        
        imgH and save_img(imgH, instance.image_high_res.path, IMAGE_RESOLUTION['normal'])
        imgL and save_img(imgL, instance.image_low_res.path, IMAGE_RESOLUTION['low'])
        instance.save()


def submission_delete(sender, instance, *args, **kwargs):
    instance.image_high_res and instance.image_high_res.delete(False)
    instance.image_low_res and instance.image_low_res.delete(False)