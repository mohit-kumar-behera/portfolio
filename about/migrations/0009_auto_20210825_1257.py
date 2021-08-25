# Generated by Django 3.2.6 on 2021-08-25 07:27

from django.db import migrations, models
import home.helper


class Migration(migrations.Migration):

    dependencies = [
        ('about', '0008_alter_award_image_low_res'),
    ]

    operations = [
        migrations.AlterField(
            model_name='award',
            name='image_high_res',
            field=models.ImageField(upload_to=home.helper.image_directory_path, verbose_name='High Resolution Award Image'),
        ),
        migrations.AlterField(
            model_name='award',
            name='image_low_res',
            field=models.ImageField(upload_to=home.helper.image_directory_path, verbose_name='Low Resolution Award Image'),
        ),
    ]