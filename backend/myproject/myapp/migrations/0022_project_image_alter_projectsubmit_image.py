# Generated by Django 5.0.6 on 2024-05-30 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0021_project_department'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='project_image/'),
        ),
        migrations.AlterField(
            model_name='projectsubmit',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='project_images/'),
        ),
    ]
