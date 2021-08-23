from django.db import models
from home.models import Profile, Technology
from home.config import MAX_RATING
from home.helper import image_directory_path, MaxValueValidator
import uuid


class Award(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(verbose_name='Award Name', max_length=50)
    directory = models.CharField(max_length=15, default='award', editable=False)
    image = models.ImageField(verbose_name='Low Resolution', upload_to=image_directory_path)
    img_high_res = models.ImageField(upload_to=image_directory_path, blank=True, null=True)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'User\'s Award'

class Skill(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    technology = models.OneToOneField(Technology, on_delete=models.CASCADE)
    rating = models.FloatField(
        verbose_name='Skill Rating', 
        validators=[MaxValueValidator], 
        help_text=f'Rating can be between 0 to {MAX_RATING}'
    )
    last_updated = models.DateField(auto_now=True)

    def __str__(self):
        return f'{self.user.username}, {self.technology.name}-{self.rating}'
    
    def __unicode__(self):
        return f'{self.user.username}, {self.technology.name}-{self.rating}'

    def save(self, *args, **kwargs):
        self.rating = round(self.rating, 1)
        super(Skill, self).save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = 'User\'s Skill'

