from django.db import models
from django.contrib.auth.models import AbstractUser


class dept(models.Model):
    dept= models.CharField(max_length=15,null=True,blank=True)   

class user(AbstractUser):
    phone=models.CharField(max_length=15,null=True,blank=True)
    user_image=models.ImageField(upload_to='profile_image/',null=True,blank=True)
    user_otp=models.IntegerField(null=True,blank=True)
    dept=models.CharField(max_length=15,null=True,blank=True)
    gender=models.CharField(max_length=15,null=True,blank=True)
    usertype=models.CharField(max_length=15,null=True,blank=True)

class degreecertificates(models.Model):
    degreeimage=models.ImageField(upload_to='degree_image/',null=True,blank=True)  
    userid=models.ForeignKey(user,on_delete=models.CASCADE,null=True,blank=True)
