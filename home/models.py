from django.db import models
from django.contrib.auth import get_user_model
# from project.models import Mentor
from home.helper import image_directory_path
import uuid, datetime
User = get_user_model()

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


class Profile(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(verbose_name='About Me')
    date_of_birth = models.DateField(verbose_name='Date of birth', null=True)
    # image_lowres = models.ImageField
    # image_highres = models.ImageField
    # education = models.OneToManyField
    # work_experience = models.OneToManyField
    mentor = models.ManyToManyField(Mentor)

    def __str__(self):
        return self.user.email
    
    def __unicode__(self):
        return self.user.email
    
    def get_age(self):
        present_year = int(datetime.datetime.now().strftime('%Y'))
        birth_year = int(self.date_of_birth.strftime('%Y'))
        return present_year - birth_year
    
    class Meta:
        verbose_name_plural = 'User Profile'


class Technology(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    name = models.CharField(verbose_name='Technology Name', max_length=30, unique=True)
    upload_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    def __unicode__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.name.isupper():
            self.name = self.name.upper()
        super(Technology, self).save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = 'Technology'
