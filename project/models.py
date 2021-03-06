from django.db import models
from django.urls import reverse
from django.utils.html import strip_tags
from home.models import Profile, Technology
from home.helper import image_directory_path
from ckeditor.fields import RichTextField
import uuid, re

class ProjectQuerySet(models.QuerySet):
    def meta_info(self, slug):
        query = self.filter(slug=slug).first()  
        if not query:
            return {}
        context = {
            "title": query.name,
            "project_num": query.project_num,
            "thumbnail": query.thumbnail.image_high_res.url if query.thumbnail else '',
            "description": query.get_short_description()
        }
        return context

class ProjectModelManager(models.Manager):
    def get_queryset(self):
        return ProjectQuerySet(self.model, using=self._db)
    
    def meta_info(self, slug):
        return self.get_queryset().meta_info(slug)

class Project(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    project_num = models.IntegerField(null=True, blank=True)
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
    video_url = models.URLField(verbose_name='Video Demo URL', null=True, blank=True)
    source_code_url = models.URLField(verbose_name='Source Code URL', null=True, blank=True)
    thumbnail = models.OneToOneField('ProjectImage', on_delete=models.CASCADE, null=True, blank=True, related_name='thumbnail')
    highlight = models.BooleanField(verbose_name='Hightlight Project', default=False)

    objects = ProjectModelManager()

    def __str__(self):
        return self.name
    
    def __unicode__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('project:view_project', kwargs={'slug': self.slug})

    def get_short_description(self):
        MAX_DESCRIPTION_SIZE = 100
        stripped_str = strip_tags(self.description)[:MAX_DESCRIPTION_SIZE]
        stripped_str = re.sub('&nbsp;', ' ', stripped_str)
        return stripped_str

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






        