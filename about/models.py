from django.db import models
from home.models import Profile, Technology
from home.config import MAX_RATING
from home.helper import image_directory_path, validate_range
from ckeditor.fields import RichTextField
import uuid

MONTHS_IN_YEAR = 12
DAYS_IN_MONTH = 30
SECS_IN_MONTH = DAYS_IN_MONTH * 24  * 60 * 60  

SECONDARY_SCHOOL= 'S'
HIGHER_SECONDARY_SCHOOL = 'HS'
UNDER_GRADUATE = 'UG'
POST_GRADUATE = 'PG'

SCHOOLING_TYPE = (
    (SECONDARY_SCHOOL, 'Secondary School'),
    (HIGHER_SECONDARY_SCHOOL, 'Higher Secondary School'),
    (UNDER_GRADUATE, 'Graduation'),
    (POST_GRADUATE, 'Post Graduation'),
)


class Award(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    name = models.CharField(verbose_name='Award Name', max_length=50)
    image_high_res = models.ImageField(verbose_name='High Resolution Award Image', upload_to=image_directory_path)
    image_low_res = models.ImageField(verbose_name='Low Resolution Award Image', upload_to=image_directory_path)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'User\'s Award'

class Skill(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    technology = models.ForeignKey(Technology, on_delete=models.CASCADE)
    rating = models.FloatField(
        verbose_name='Skill Rating', 
        validators=[validate_range], 
        help_text=f'Rating can be between 0 to {MAX_RATING}'
    )
    last_updated = models.DateField(auto_now=True)

    def __str__(self):
        return f'{self.profile.user}, {self.technology.name}-{self.rating}'
    
    def __unicode__(self):
        return f'{self.profile.user}, {self.technology.name}-{self.rating}'

    def save(self, *args, **kwargs):
        self.rating = round(self.rating, 1)
        super(Skill, self).save(*args, **kwargs)
    
    class Meta:
        unique_together = ('profile', 'technology')
        verbose_name_plural = 'User\'s Skill'


class ExperienceDetail(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    name = models.CharField(verbose_name='Field Name', max_length=50)
    start_date = models.DateField(verbose_name='Start Date')
    end_date = models.DateField(verbose_name='End Date')
    url = models.URLField(verbose_name='Field URL')

    def __str__(self):
        return self.name
    
    def __unicode__(self):
        return self.name

    class Meta:
        abstract = True


class Education(ExperienceDetail):
    state = models.CharField(verbose_name='Passed out State', max_length=40)
    tag = models.CharField(
        verbose_name='Type of Schooling', 
        max_length=5, 
        choices=SCHOOLING_TYPE, 
        null=True, blank=True
    )
    short_descp = models.CharField(verbose_name='Small Description', max_length=60, default='General Science')

    class Meta:
        verbose_name_plural = 'Education'
    
    def format_time_duration(self):
        joining_year = int(self.start_date.strftime('%Y'))
        leaving_year = int(self.end_date.strftime('%Y'))
        return f'{joining_year} - {leaving_year}'
    

class Work(ExperienceDetail):
    position = models.CharField(verbose_name='Work Position', max_length=60)
    image_low_res = models.ImageField(verbose_name='Low Resolution Logo Image', upload_to=image_directory_path)
    detail = RichTextField()

    class Meta:
        verbose_name_plural = 'Work Experience'

    def format_time_duration(self):
        start_date, end_date = self.start_date, self.end_date
        time_interval = end_date - start_date
        month_interval = time_interval.total_seconds() / SECS_IN_MONTH
        if month_interval > MONTHS_IN_YEAR:
            return round(month_interval / MONTHS_IN_YEAR, 1) 
        return round(month_interval, 0)
