# Generated by Django 5.0.6 on 2024-05-13 08:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_user_dept_user_gender'),
    ]

    operations = [
        migrations.CreateModel(
            name='dept',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dept', models.CharField(blank=True, max_length=15, null=True)),
            ],
        ),
    ]
