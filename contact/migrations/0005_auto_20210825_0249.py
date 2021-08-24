# Generated by Django 3.2.6 on 2021-08-24 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0004_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='url',
            field=models.CharField(default='we', max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='contact',
            name='value',
            field=models.CharField(max_length=40, verbose_name='Enter Contact'),
        ),
    ]
