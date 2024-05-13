# Generated by Django 5.0.6 on 2024-05-13 11:12

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0004_user_usertype'),
    ]

    operations = [
        migrations.CreateModel(
            name='degreecertificates',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('degreeimage', models.ImageField(blank=True, null=True, upload_to='degree_image/')),
                ('userid', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]