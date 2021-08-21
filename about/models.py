from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
# from django.db.models.signals import post_save
# from django.dispatch import receiver
from home.models import Technology
import uuid
User = get_user_model()

MAX_RATING_LIMIT = 5

def MaxValueValidator(rating):
    if rating > 0 and rating < MAX_RATING_LIMIT:
        return rating
    raise ValidationError(f'Rating can be between 0 to {MAX_RATING_LIMIT}')

class Skill(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    technology = models.OneToOneField(Technology, on_delete=models.CASCADE)
    rating = models.FloatField(
        verbose_name='Skill Rating', 
        validators=[MaxValueValidator], 
        help_text=f'Rating can be between 0 to {MAX_RATING_LIMIT}'
    )
    last_updated = models.DateField(auto_now=True)

    def __str__(self):
        return f'{self.user.username}, {self.technology.name}-{self.rating}'
    
    def __unicode__(self):
        return f'{self.user.username}, {self.technology.name}-{self.rating}'
    
    class Meta:
        verbose_name_plural = 'User\'s Skill'
