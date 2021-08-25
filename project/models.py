from django.db import models
from home.models import Profile, Technology
from home.helper import image_directory_path
from ckeditor.fields import RichTextField
import uuid, random

class Project(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    name = models.CharField(verbose_name='Project Title', max_length=255)
    slug = models.SlugField(
        max_length=255, 
        blank=True,
        null=True,
        db_index=True
    )
    description = RichTextField()
    date_added = models.DateField(auto_now_add=True)
    date_updated = models.DateField(auto_now=True)
    tech_stack = models.ManyToManyField(Technology)
    project_url = models.URLField(verbose_name='Project URL', null=True, blank=True) 
    video_url = models.URLField(verbose_name='Video Demo URL')
    source_code_url = models.URLField(verbose_name='Source Code URL')
    image_high_res = models.ImageField(verbose_name='High Resolution Thumbnail Image', upload_to=image_directory_path)
    image_low_res = models.ImageField(verbose_name='Low Resolution Thumbnail Image', upload_to=image_directory_path)

    def __str__(self):
        return f'{self.profile} {self.name}'
    
    def __unicode__(self):
        return f'{self.profile} {self.name}'

    class Meta:
        verbose_name_plural = 'Project'


class ProjectImage(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True)
    name = models.CharField(verbose_name='Name of Project image', max_length=80)
    image_high_res = models.ImageField(verbose_name='High Resolution Project Image', upload_to=image_directory_path)
    image_low_res = models.ImageField(verbose_name='Low Resolution Project Image', upload_to=image_directory_path)

    def __str__(self):
        return f'{self.project} {self.name}'
    
    def __unicode__(self):
        return f'{self.project} {self.name}'

    class Meta:
        verbose_name_plural = 'Project Images'






        