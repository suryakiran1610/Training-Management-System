# Generated by Django 5.0.6 on 2024-05-13 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0003_dept'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='usertype',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]