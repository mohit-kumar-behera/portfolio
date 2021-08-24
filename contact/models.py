from django.db import models
from home.models import Profile
import uuid

CONTACT_TYPE = (
    ('phone', 'phone'),
    ('email', 'email')
)

class Contact(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    type = models.CharField(verbose_name='Select type', max_length=10, choices=CONTACT_TYPE) 
    value = models.CharField(verbose_name='Enter Contact', max_length=120)
    last_updated = models.DateField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return f'{self.profile} {self.value}'

    def __unicode__(self):
        return f'{self.profile} {self.value}'
    
    class Meta:
        verbose_name_plural = 'Contact Detail'