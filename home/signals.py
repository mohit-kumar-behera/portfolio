from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from about.models import Award
from home.models import Profile
from home.helper import compress_image
User = get_user_model()


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        try:
            Profile.objects.create(user=instance)
        except:
            pass


@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if not created and instance.profile:
        instance.profile.save()


@receiver(post_delete, sender=Profile)
def delete_user(sender, instance, **kwargs):
    instance.user and instance.user.delete()


@receiver(post_save, sender=Award)
def dual_resolution_image(sender, instance, created, **kwargs):
    if created:
        compress_image(instance, save=True)


@receiver(post_save, sender=Award)
def update_dual_resolution_image(sender, instance, created, **kwargs):
    if not created:
        compress_image(instance, save=False)


@receiver(post_delete, sender=Award)
def submission_delete(sender, instance, *args, **kwargs):
    instance.image_high_res and instance.image_high_res.delete(False)
    instance.image_low_res and instance.image_low_res.delete(False)
