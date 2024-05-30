from django.db import models
from django.contrib.auth.models import AbstractUser


class dept(models.Model):
    dept= models.CharField(max_length=15,null=True,blank=True)
    dept_image=models.ImageField(upload_to='dept_image/',null=True,blank=True)
   

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

class attendence(models.Model):
    username=models.CharField(max_length=150,null=True,blank=True)
    userid=models.IntegerField(null=True,blank=True)
    depatment=models.CharField(max_length=150,null=True,blank=True)
    date=models.DateField()
    status=models.CharField(max_length=150,null=True,blank=True)

class traineeattendence(models.Model):
    username=models.CharField(max_length=150,null=True,blank=True)
    userid=models.IntegerField(null=True,blank=True)
    depatment=models.CharField(max_length=150,null=True,blank=True)
    date=models.DateField()
    status=models.CharField(max_length=150,null=True,blank=True)    

class leave(models.Model):
    username=models.CharField(max_length=150,null=True,blank=True)
    userid=models.IntegerField(null=True,blank=True)
    depatment=models.CharField(max_length=150,null=True,blank=True)
    fromdate=models.DateField()
    todate=models.DateField()
    status=models.CharField(max_length=150,null=True,blank=True)
    usertype=models.CharField(max_length=15,null=True,blank=True)
    message=models.CharField(max_length=350,null=True,blank=True)

class batch(models.Model):
    dept= models.CharField(max_length=25,null=True,blank=True)
    trainer=models.CharField(max_length=25,null=True,blank=True)
    trainerid=models.IntegerField(null=True,blank=True)
    traineeid=models.CharField(max_length=25,null=True,blank=True)
    batchname= models.CharField(max_length=25,null=True,blank=True)
    time=models.TimeField(null=True,blank=True)
    date=models.CharField(max_length=55,null=True,blank=True)

class notification(models.Model):
    trainerid=models.IntegerField(null=True,blank=True)
    message=models.CharField(max_length=250,null=True,blank=True)
    userid=models.IntegerField(null=True,blank=True)
    username=models.CharField(max_length=250,null=True,blank=True)
    batchname=models.CharField(max_length=250,null=True,blank=True)
    dept=models.CharField(max_length=250,null=True,blank=True)
    type=models.CharField(max_length=250,null=True,blank=True)
    isread=models.BooleanField(default=False)
    usertype=models.CharField(max_length=250,null=True,blank=True)


class project(models.Model):
    projectname=models.CharField(max_length=250,null=True,blank=True)
    batchname=models.CharField(max_length=250,null=True,blank=True)
    traineeid=models.IntegerField(null=True,blank=True)
    traineename=models.CharField(max_length=250,null=True,blank=True)
    traineeimage=models.ImageField(upload_to='trainee_image/',null=True,blank=True)
    trainerid=models.IntegerField(null=True,blank=True)
    trainername=models.CharField(max_length=250,null=True,blank=True)
    department=models.CharField(max_length=250,null=True,blank=True)
    start=models.DateField()
    end=models.DateField()
    status=models.CharField(max_length=250,null=True,blank=True)
    image=models.ImageField(upload_to='project_image/',null=True,blank=True)


class projectsubmit(models.Model):
    projectname=models.CharField(max_length=250,null=True,blank=True)
    projectid=models.IntegerField(null=True,blank=True)
    batchname=models.CharField(max_length=250,null=True,blank=True)
    traineeid=models.IntegerField(null=True,blank=True)
    start=models.DateField()
    end=models.DateField()
    status=models.CharField(max_length=250,null=True,blank=True)
    image=models.ImageField(upload_to='project_images/',null=True,blank=True)


   


   







    