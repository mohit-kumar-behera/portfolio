# Generated by Django 3.2.6 on 2021-08-24 20:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0002_contact_last_updated'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contact',
            name='url',
        ),
    ]
