from django.core.exceptions import ValidationError
from home.config import MAX_RATING, WATERMARK_DIM, IMAGE_RESOLUTION
from PIL import Image
import random

def image_directory_path(instance, filename):
    """ Set path for image """
    extension = filename.split('.')[1]
    filename = f'{instance.__class__.__name__.lower()}/{instance.name.lower()}{random.randint(1111, 9999)}.{extension}'
    return filename


# add logo to image
def add_logo_watermark(imgH, imgL):
    logo = Image.open('./static/media/image/mk-final.png')
    # width, height = (width, height)
    logo_w, logo_h = logo.size 
    imgH_w, imgH_h = imgH.size
    imgL_w, imgL_h = imgL.size

    watermark_w, watermark_h = WATERMARK_DIM

    if logo_w > watermark_w and logo_h > watermark_h:
        logo.thumbnail(WATERMARK_DIM)

    offset_H = ((imgH_w - watermark_w - 5), (imgH_h - watermark_h - 5))
    offset_L = ((imgL_w - watermark_w - 5), (imgL_h - watermark_h - 5))

    imgH and imgH.paste(logo, offset_H)
    imgL and imgL.paste(logo, offset_L)


# Compress image into high resolution and low resolution
def compress_image(instance, save=False):
    if instance.image_high_res and instance.image_low_res:
        imgH = Image.open(instance.image_high_res)
        imgL = Image.open(instance.image_low_res)

        if instance.__class__.__name__.lower() == 'project':
            add_logo_watermark(imgH, imgL)
        
        imgH.save(instance.image_high_res.path, quality=IMAGE_RESOLUTION['normal'])
        imgL.save(instance.image_low_res.path, quality=IMAGE_RESOLUTION['low'])
    if save:
        instance.save()


def MaxValueValidator(rating):
    if rating > 0 and rating < MAX_RATING:
        return rating
    raise ValidationError(f'Rating can be between 0 to {MAX_RATING}')
