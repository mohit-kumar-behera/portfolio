from django.db import models
from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from home.config import (
    THUMBNAIL_DIM,
    IMAGE_TYPE,
    IMAGE_RESOLUTION,
    IMAGE_RESOLUTION_CHOICE
)
import uuid, random

#3rd party package
from PIL import Image


def image_directory_path(instance, filename):
    """ Set path for image """
    extension = filename.split('.')[1]
    filename = f'{instance.type}/{instance.name}{random.randint(1111, 9999)}.{extension}'
    return filename

class ImageUploader(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    type = models.CharField(verbose_name='Image Type', choices=IMAGE_TYPE, max_length=20, default='project')
    name = models.CharField(verbose_name='Name of Image', max_length=25)
    alt = models.CharField(verbose_name='Alternative tag', max_length=255)
    resolution = models.CharField(verbose_name='Image Resolution', choices=IMAGE_RESOLUTION_CHOICE, max_length=3, default='NL')
    upload_date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(verbose_name='Upload Image', upload_to=image_directory_path)

    def __str__(self):
        return f'{self.type}/{self.name}'

    def __unicode__(self):
        return f'{self.type}/{self.name}'
    
    class Meta:
        verbose_name_plural = 'Image Uploader'


class Technology(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    name = models.CharField(verbose_name='Technology Name', max_length=30, unique=True)
    upload_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    def __unicode__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Technology'



@receiver(post_save, sender=ImageUploader)
def compress_image(sender, instance, created, *args, **kwargs):
    if created:
        img = Image.open(instance.image.path)
        if instance.type == 'avataar' and img.width > THUMBNAIL_DIM and img.height > THUMBNAIL_DIM:
            img.thumbnail((THUMBNAIL_DIM, THUMBNAIL_DIM))
        img.save(instance.image.path, quality=IMAGE_RESOLUTION[instance.resolution])

@receiver(post_delete, sender=ImageUploader)
def submission_delete(sender, instance, *args, **kwargs):
    instance.image.delete(False)

@receiver(pre_save, sender=Technology)
def capitalize_techname(sender, instance, *args, **kwargs):
    try:
        Technology.objects.get(name__iexact=instance.name)
    except Technology.DoesNotExist:
        instance.name = instance.name.title()
    else:
        raise ValueError('Technology with this name already exists')
