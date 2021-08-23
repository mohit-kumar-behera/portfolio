from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from PIL import Image
from home.config import (
    THUMBNAIL_DIM,
    IMAGE_TYPE,
    IMAGE_RESOLUTION,
    IMAGE_RESOLUTION_CHOICE
)
import uuid, random, datetime
User = get_user_model()


def image_directory_path(instance, filename):
    """ Set path for image """
    extension = filename.split('.')[1]
    filename = f'{instance.type}/{instance.name}{random.randint(1111, 9999)}.{extension}'
    return filename


class Profile(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(verbose_name='About Me')
    date_of_birth = models.DateField(verbose_name='Date of birth', null=True)
    # image_lowres = models.ImageField
    # image_highres = models.ImageField
    # language_spoken = models.OneToManyField
    # address = models.OneToManyField
    # contact = models.OneToManyField
    # education = models.OneToManyField
    # social_account = models.OneToManyField
    # work_experience = models.OneToManyField
    # awards = models.OneToManyField
    # skills = models.OneToManyField

    def __str__(self):
        return self.user.email
    
    def __unicode__(self):
        return self.user.email
    
    def get_age(self):
        present_year = int(datetime.datetime.now().strftime('%Y'))
        birth_year = int(self.date_of_birth.strftime('%Y'))
        return present_year - birth_year
    
    class Meta:
        verbose_name_plural = 'User Profile'


class Technology(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    name = models.CharField(verbose_name='Technology Name', max_length=30, unique=True)
    upload_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    def __unicode__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.name.isupper():
            self.name = self.name.upper()
        super(Technology, self).save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = 'Technology'



# @receiver(post_save, sender=ImageUploader)
# def compress_image(sender, instance, created, *args, **kwargs):
#     if created:
#         img = Image.open(instance.image.path)
#         if instance.type == 'avataar' and img.width > THUMBNAIL_DIM and img.height > THUMBNAIL_DIM:
#             img.thumbnail((THUMBNAIL_DIM, THUMBNAIL_DIM))
#         img.save(instance.image.path, quality=IMAGE_RESOLUTION[instance.resolution])

# @receiver(post_delete, sender=ImageUploader)
# def submission_delete(sender, instance, *args, **kwargs):
#     instance.image.delete(False)



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