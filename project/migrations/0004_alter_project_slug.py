# Generated by Django 3.2.6 on 2021-08-25 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_auto_20210826_0017'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='slug',
            field=models.SlugField(blank=True, max_length=255, null=True),
        ),
    ]
