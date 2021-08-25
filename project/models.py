from home.helper import image_directory_path
from django.db import models
from home.helper import image_directory_path
import uuid

class Mentor(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    name = models.CharField(verbose_name='Mentor Name', max_length=80)
    image_low_res = models.ImageField(verbose_name='Low Resolution Profile Image', upload_to=image_directory_path)
    
    def __str__(self):
        return self.name
    
    def __unicode__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Mentor'


class MentorChannel(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE)
    name = models.CharField(verbose_name='Channel Name', max_length=40)
    url = models.URLField(verbose_name='Channel URL')

    def __str__(self):
        return self.name
    
    def __unicode__(self):
        return self.name

    def save(self, *args, **kwargs):
        name, tag = self.name, 'channel'
        if not tag in name.lower():
            self.name = f'{self.name} {tag.capitalize()}'
        super(MentorChannel, self).save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = 'Mentor Channel'
        