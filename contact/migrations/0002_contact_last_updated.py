# Generated by Django 3.2.6 on 2021-08-24 20:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='last_updated',
            field=models.DateField(auto_now=True, null=True),
        ),
    ]