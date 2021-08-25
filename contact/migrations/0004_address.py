# Generated by Django 3.2.6 on 2021-08-24 21:12

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
        ('contact', '0003_remove_contact_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('type', models.CharField(choices=[('work', 'work'), ('home', 'home'), ('other', 'other')], max_length=10, verbose_name='Address Type')),
                ('street', models.CharField(max_length=255, verbose_name='Street')),
                ('city', models.CharField(max_length=40, verbose_name='City')),
                ('district', models.CharField(max_length=40, verbose_name='District')),
                ('pin', models.CharField(max_length=6, verbose_name='PIN')),
                ('state', models.CharField(max_length=40, verbose_name='State')),
                ('coutry', models.CharField(max_length=40, verbose_name='Country')),
                ('mapURL', models.URLField(blank=True, null=True, verbose_name='URL of MAP')),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='home.profile')),
            ],
            options={
                'verbose_name_plural': 'Address Detail',
            },
        ),
    ]