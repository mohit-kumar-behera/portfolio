# Generated by Django 3.2.6 on 2021-08-30 09:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_alter_profile_cv'),
        ('about', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skill',
            name='technology',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.technology'),
        ),
    ]
