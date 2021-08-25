from django.db import models
from home.models import Profile
from home.helper import image_directory_path
import uuid

CONTACT_TYPE = (
    ('phone', 'phone'),
    ('email', 'email')
)

ADDRESS_CHOICE = (
    ('work', 'work'),
    ('home', 'home'),
    ('other', 'other'),
)

SOCIALACCOUNT_CHOICE = (
    ('linkedin', 'linkedin'),
    ('whatsapp', 'whatsapp'),
    ('github', 'github'),
    ('facebook', 'facebook'),
    ('twitter', 'twitter'),
    ('instagram', 'instagram'),
)

class Contact(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    type = models.CharField(verbose_name='Select type', max_length=10, choices=CONTACT_TYPE) 
    value = models.CharField(verbose_name='Enter Contact', max_length=40)
    url = models.CharField(max_length=50)
    last_updated = models.DateField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return f'{self.profile} {self.value}'

    def __unicode__(self):
        return f'{self.profile} {self.value}'
    
    def save(self, *args, **kwargs):
        tag = 'tel' if self.type == 'phone' else 'mailto'
        self.url = f'{tag}:{self.value}'
        super(Contact, self).save(*args, **kwargs)
         
    class Meta:
        verbose_name_plural = 'Contact Detail'


class Address(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    type = models.CharField(verbose_name='Address Type', max_length=10, choices=ADDRESS_CHOICE)
    street = models.CharField(verbose_name='Street', max_length=255)
    city = models.CharField(verbose_name='City', max_length=40)
    district = models.CharField(verbose_name='District', max_length=40)
    pin = models.CharField(verbose_name='PIN', max_length=6)
    state = models.CharField(verbose_name='State', max_length=40)
    country = models.CharField(verbose_name='Country', max_length=40)
    mapURL = models.URLField(verbose_name='URL of MAP', blank=True, null=True)

    def __str__(self):
        return f'{self.profile} {self.type} address'

    def __unicode__(self):
        return f'{self.profile} {self.type} address'

    def save(self, *args, **kwargs):
        self.state, self.country = self.state.title(), self.country.title()
        super(Address, self).save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = 'Address Detail'


class SocialAccount(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    name = models.CharField(
        verbose_name='Social Media', 
        max_length=30, 
        choices=SOCIALACCOUNT_CHOICE, 
        unique=True,
        error_messages= {
            'unique': 'You already have added this social account.'
        })
    url = models.URLField(verbose_name='Social Media Link')
    image_low_res = models.ImageField(verbose_name='Low Resolution Account Image', upload_to=image_directory_path)

    def __str__(self):
        return f'{self.profile} {self.name}'

    def __unicode__(self):
        return f'{self.profile} {self.name}'

    class Meta:
        verbose_name_plural = 'Social Account'
    