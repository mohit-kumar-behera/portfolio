# Generated by Django 3.2.6 on 2021-09-16 11:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_delete_quicklink'),
        ('contact', '0002_message'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='socialaccount',
            unique_together={('profile', 'name')},
        ),
    ]