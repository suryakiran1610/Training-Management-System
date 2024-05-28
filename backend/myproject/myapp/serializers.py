from rest_framework import serializers
from .models import user
from .models import dept
from .models import degreecertificates
from .models import attendence
from .models import traineeattendence
from . models import leave
from .models import batch
from.models import notification

class userserializer(serializers.ModelSerializer):
    class Meta:
        model=user
        fields = ["id","email","phone","user_image","dept","gender","first_name","last_name","usertype","password","username","is_active","date_joined"] 

class deptserializer(serializers.ModelSerializer):
    class Meta:
        model=dept
        fields = '__all__'   

class degreeimgserializer(serializers.ModelSerializer):
    class Meta:
        model=degreecertificates
        fields = '__all__'           

class attendenceserializer(serializers.ModelSerializer):
    class Meta:
        model=attendence
        fields = '__all__'   

class traineeattendenceserializer(serializers.ModelSerializer):
    class Meta:
        model=traineeattendence
        fields = '__all__'      
class leaveserializer(serializers.ModelSerializer):
    class Meta:
        model=leave
        fields= '__all__'

class batchserializer(serializers.ModelSerializer):
    class Meta:
        model=batch
        fields= '__all__'        

class notificationserializer(serializers.ModelSerializer):        
    class Meta:
        model=notification
        fields='__all__'
