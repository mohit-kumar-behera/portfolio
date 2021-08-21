from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin, Group
from django.db.models.query_utils import select_related_descend
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid, datetime

USERNAME_REGEX = '^[a-zA-Z0-9@.-_]*$'

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        """ Creates and saves an User """
        if not email:
            raise ValidationError('User must have an email address')
        
        if not username:
            raise ValidationError('User must have an username')
        
        user = self.model(
            email=self.normalize_email(email),
            username=username
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_staffuser(self, username, email, password):
        """ Creates and saves a Staff User """
        if not email:
            raise ValidationError('User must have an email address')
        
        if not username:
            raise ValidationError('User must have an username')
        
        user = self.create_user(
            email=self.normalize_email(email),
            username=username
        )
        user.set_password(password)
        user.is_staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        """ Creates and saves a Superuser """
        if not email:
            raise ValidationError('User must have an email address')
        
        if not username:
            raise ValidationError('User must have an username')
        
        user = self.create_user(
            email=self.normalize_email(email),
            username=username
        )
        user.set_password(password)
        user.is_superuser = True
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    username = models.CharField(
        verbose_name='Username', 
        max_length=40, 
        validators=[
            RegexValidator(
                regex=USERNAME_REGEX, 
                message='username must be alphanumeric. Can contain characters like @ . - _',
                code='invalid_username'
            )
        ]
    )
    email = models.CharField(verbose_name='Email Address', max_length=120, unique=True)
    first_name = models.CharField(verbose_name='First Name', max_length=40)
    last_name = models.CharField(verbose_name='Last Name', max_length=40, blank=True, null=True)
    date_joined = models.DateTimeField(verbose_name='Date Joined', auto_now_add=True)
    is_admin = models.BooleanField(verbose_name='Admin User', default=False)
    is_staff = models.BooleanField(verbose_name='Staff User', default=False)
    is_superuser = models.BooleanField(verbose_name='Super User', default=False)
    is_active = models.BooleanField(verbose_name='Active User', default=True)
    groups = models.ManyToManyField(Group, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email
    
    def __unicode__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True
    
    @property
    def get_full_name(self):
        return f'{self.first_name} {self.last_name if self.last_name else ""}'
    
    @property
    def get_first_name(self):
        return self.first_name

    @property
    def get_last_name(self):
        return self.last_name if self.last_name else None


class Profile(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(verbose_name='About Me')
    date_of_birth = models.DateField(verbose_name='Date of birth')
    # image_lowres = models.ImageField
    # image_highres = models.ImageField
    # language_spoken = models.OneToManyField
    # address = models.OneToManyField
    # contact = models.OneToManyField
    # education = models.OneToManyField
    # social_account = models.OneToManyField
    # work_experience = models.OneToManyField
    # awards = models.OneToManyField
    # skills = models.OneToManyField

    def __str__(self):
        return self.user.email
    
    def __unicode__(self):
        return self.user.email
    
    def get_age(self):
        present_year = int(datetime.datetime.now().strftime('%Y'))
        birth_year = int(self.date_of_birth.strftime('%Y'))
        return present_year - birth_year


@receiver(post_save, sender=User)
def createUserProfile(sender, instance, created, *args, **kwargs):
    if created:
        try:
            Profile.objects.create(user=instance)
        except:
            pass

@receiver(post_save, sender=User)
def updateUserProfile(sender, instance, created, *args, **kwargs):
    if not created:
        instance.profile.save()

