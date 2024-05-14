from rest_framework import serializers
from .models import user
from .models import dept
from .models import degreecertificates

class userserializer(serializers.ModelSerializer):
    class Meta:
        model=user
        fields = ["id","email","phone","user_image","dept","gender","first_name","last_name","usertype","password","username"] 

class deptserializer(serializers.ModelSerializer):
    class Meta:
        model=dept
        fields = '__all__'   

class degreeimgserializer(serializers.ModelSerializer):
    class Meta:
        model=degreecertificates
        fields = '__all__'           

