# Generated by Django 3.2.6 on 2021-08-23 13:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('about', '0004_auto_20210823_1820'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='award',
            name='directory',
        ),
    ]