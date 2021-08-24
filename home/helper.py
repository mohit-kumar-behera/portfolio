from django.core.exceptions import ValidationError
from home.config import MAX_RATING
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


def MaxValueValidator(rating):
    if rating > 0 and rating < MAX_RATING:
        return rating
    raise ValidationError(f'Rating can be between 0 to {MAX_RATING}')
