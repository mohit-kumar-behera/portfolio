from django.core.exceptions import ValidationError
from home.config import (
    THUMBNAIL_DIM,
    MAX_RATING,
    IMAGE_RESOLUTION,
)
from PIL import Image
import random

def image_directory_path(instance, filename):
    """ Set path for image """
    extension = filename.split('.')[1]
    filename = f'{instance.__class__.__name__.lower()}/{instance.name.lower()}{random.randint(1111, 9999)}.{extension}'
    return filename

def get_img(image):
    return image and Image.open(image.path)

def save_img(image, imagePath, quality):
    image.save(imagePath, quality=quality)

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

def MaxValueValidator(rating):
    if rating > 0 and rating < MAX_RATING:
        return rating
    raise ValidationError(f'Rating can be between 0 to {MAX_RATING}')
