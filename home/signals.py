from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from project.models import Mentor, MentorChannel
from contact.models import SocialAccount
from about.models import Award, Education, Work
from home.models import Profile
from home.helper import compress_image, convert_thumbnail
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
        compress_image(instance, dual=True, save=True)


@receiver(post_save, sender=Award)
def update_dual_resolution_image(sender, instance, created, **kwargs):
    if not created:
        compress_image(instance, dual=True, save=False)


@receiver(post_save, sender=SocialAccount)
def single_resolution_image(sender, instance, created, **kwargs):
    if created:
        compress_image(instance, dual=False, save=True)


@receiver(post_save, sender=Work)
@receiver(post_save, sender=Mentor)
@receiver(post_save, sender=SocialAccount)
def update_single_resolution_image(sender, instance, created, **kwargs):
    if not created:
        compress_image(instance, dual=False, save=False)


@receiver(post_save, sender=Mentor)
@receiver(post_save, sender=Work)
def convert_thumbnail_image(sender, instance, created, **kwargs):
    if created:
        convert_thumbnail(instance, save=True)


@receiver(post_save, sender=Mentor)
@receiver(post_save, sender=Work)
def update_convert_thumbnail_image(sender, instance, created, **kwargs):
    if not created:
        convert_thumbnail(instance, save=False)



@receiver(post_delete, sender=SocialAccount)
@receiver(post_delete, sender=Mentor)
@receiver(post_delete, sender=Work)
@receiver(post_delete, sender=Award)
def submission_delete(sender, instance, *args, **kwargs):
    try:
        instance.image_high_res
    except:
        pass
    else:
        instance.image_high_res.delete(False)
    
    try:
        instance.image_low_res
    except:
        pass
    else:
        instance.image_low_res.delete(False)


@receiver(post_save, sender=Work)
@receiver(post_save, sender=Education)
@receiver(post_save, sender=Mentor)
@receiver(post_save, sender=MentorChannel)
def capitalize_name(sender, instance, created, **kwargs):
    if created:
        instance.name = instance.name.title()
        instance.save()
