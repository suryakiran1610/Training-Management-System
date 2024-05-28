# Generated by Django 5.0.6 on 2024-05-27 06:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0012_notification_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notification',
            old_name='traineeid',
            new_name='userid',
        ),
        migrations.RemoveField(
            model_name='notification',
            name='trainerid',
        ),
        migrations.AddField(
            model_name='notification',
            name='isread',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='notification',
            name='managername',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='notification',
            name='username',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
