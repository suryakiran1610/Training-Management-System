# Generated by Django 5.0.6 on 2024-05-27 07:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0013_rename_traineeid_notification_userid_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='usertype',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
