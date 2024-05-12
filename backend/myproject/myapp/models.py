from django.db import models
from django.contrib.auth.models import AbstractUser


class user(AbstractUser):
    phone=models.CharField(max_length=15,null=True,blank=True)
    user_image=models.ImageField(upload_to='profile_image/',null=True,blank=True)
    user_otp=models.IntegerField(null=True,blank=True)