# Generated by Django 5.0.6 on 2024-05-21 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='traineeattendence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(blank=True, max_length=150, null=True)),
                ('userid', models.IntegerField(blank=True, null=True)),
                ('depatment', models.CharField(blank=True, max_length=150, null=True)),
                ('date', models.DateField()),
                ('status', models.CharField(blank=True, max_length=150, null=True)),
            ],
        ),
    ]
