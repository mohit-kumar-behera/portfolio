from home.config import *
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


"""
D:\Dev\django\mohit\portfolio\static\media\award\award_is_good4012.jpg
"""