import uuid
from django.contrib.auth import get_user_model
from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from project.models import Project, ProjectImage
from contact.models import Message, SocialAccount
from about.models import Award, Education, Work
from home.models import Profile, Mentor, MentorChannel, ProfileImage
from home.helper import compress_image, convert_thumbnail, slugify_title
User = get_user_model()


"""Create Profile when User is created"""
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        try:
            Profile.objects.create(user=instance)
        except:
            pass


"""Update Profile when User is updated"""
@receiver(post_save, sender=User)
def update__user_profile(sender, instance, created, **kwargs):
    if not created and instance.profile:
        instance.profile.save()


"""Delete the user when Profile of that User is deleted"""
@receiver(post_delete, sender=Profile)
def delete_user(sender, instance, **kwargs):
    instance.user and instance.user.delete()


"""Create low + high resolution images from the mentioned Model on creation"""
@receiver(post_save, sender=ProfileImage)
@receiver(post_save, sender=ProjectImage)
@receiver(post_save, sender=Award)
def dual_resolution_image(sender, instance, created, **kwargs):
    if created:
        compress_image(instance, dual=True, save=True)


"""Create low + high resolution images from the mentioned Model on updation"""
@receiver(post_save, sender=ProfileImage)
@receiver(post_save, sender=ProjectImage)
@receiver(post_save, sender=Award)
def update__dual_resolution_image(sender, instance, created, **kwargs):
    if not created:
        compress_image(instance, dual=True, save=False)


"""Create low resolution images from the mentioned Model on creation"""
@receiver(post_save, sender=SocialAccount)
def single_resolution_image(sender, instance, created, **kwargs):
    if created:
        compress_image(instance, dual=False, save=True)


"""Create low resolution images from the mentioned Model on updation"""
@receiver(post_save, sender=Mentor)
@receiver(post_save, sender=SocialAccount)
@receiver(post_save, sender=Work)
def update__single_resolution_image(sender, instance, created, **kwargs):
    if not created:
        compress_image(instance, dual=False, save=False)


"""Convert image to thumbnail when Model is created"""
@receiver(post_save, sender=Mentor)
@receiver(post_save, sender=Work)
def convert_thumbnail_image(sender, instance, created, **kwargs):
    if created:
        convert_thumbnail(instance, save=True)


"""Convert image to thumbnail when Model is updated"""
@receiver(post_save, sender=Mentor)
@receiver(post_save, sender=Work)
def update__convert_thumbnail_image(sender, instance, created, **kwargs):
    if not created:
        convert_thumbnail(instance, save=False)


"""Delete the image instance when Model is deleted"""
@receiver(post_delete, sender=ProfileImage)
@receiver(post_delete, sender=Award)
@receiver(post_delete, sender=Mentor)
@receiver(post_delete, sender=ProjectImage)
@receiver(post_delete, sender=SocialAccount)
@receiver(post_delete, sender=Work)
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


"""Capitalize the name field on creation"""
@receiver(post_save, sender=Project)
@receiver(post_save, sender=Education)
@receiver(post_save, sender=Message)
@receiver(post_save, sender=Mentor)
@receiver(post_save, sender=MentorChannel)
@receiver(post_save, sender=Work)
def capitalize_name(sender, instance, created, **kwargs):
    if created:
        instance.name = instance.name.title()
        instance.save()


"""Slugify the title field in project"""
@receiver(pre_save, sender=Project)
def slugify_title_pre_method(sender, instance, **kwargs):
    if instance.slug is None:
        slugify_title(instance, save=False)


"""Slugify the title field in project"""
@receiver(post_save, sender=Project)
def slugify_title_post_method(sender, instance, created, **kwargs):
    if created:
        slugify_title(instance, save=True)
