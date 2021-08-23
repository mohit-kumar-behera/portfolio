from django.core.exceptions import ValidationError
from home.config import (
    THUMBNAIL_DIM,
    MAX_RATING,
    IMAGE_RESOLUTION,
    IMAGE_TYPE,
    IMAGE_RESOLUTION_CHOICE,
)
from PIL import Image
import random

def image_directory_path(instance, filename):
    """ Set path for image """
    extension = filename.split('.')[1]
    filename = f'{instance.directory}/{instance.name.lower()}{random.randint(1111, 9999)}.{extension}'
    return filename

def compress_image(sender, instance, created, **kwargs):
    if created:
        temp = instance.image
        img = Image.open(instance.image.path)
        # if instance.type == 'avataar' and img.width > THUMBNAIL_DIM and img.height > THUMBNAIL_DIM:
        #     img.thumbnail((THUMBNAIL_DIM, THUMBNAIL_DIM))
        # img.save(instance.image.path, quality=IMAGE_RESOLUTION[instance.resolution])
        # instance.img_high_res = instance.image
        # img2 = Image.open(instance.img_high_res.path)
        img.save(instance.image.path, quality=20)
        print(instance.image.path)
        instance.save()


def submission_delete(sender, instance, *args, **kwargs):
    instance.image.delete(False)

def MaxValueValidator(rating):
    if rating > 0 and rating < MAX_RATING:
        return rating
    raise ValidationError(f'Rating can be between 0 to {MAX_RATING}')



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