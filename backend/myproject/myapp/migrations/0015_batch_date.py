# Generated by Django 5.0.6 on 2024-05-29 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0014_notification_usertype'),
    ]

    operations = [
        migrations.AddField(
            model_name='batch',
            name='date',
            field=models.CharField(blank=True, max_length=55, null=True),
        ),
    ]
