from django.shortcuts import render
from .models import user
from .models import dept
from .models import degreecertificates
from .serializers import userserializer
from .serializers import degreeimgserializer
from .serializers import deptserializer
from django.core.mail import send_mail
import random
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from django.shortcuts import get_list_or_404
from django.shortcuts import get_list_or_404





    

@api_view(['POST'])
def Register(request):
    serializer=userserializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        email=serializer.validated_data.get('email')
        phone=serializer.validated_data.get('phone')
        first=request.data.get('first')
        second=request.data.get('second')
        usertype1=request.data.get('user')
        dept=serializer.validated_data.get('dept')
        image = request.FILES.get('profileimg')
        gender=serializer.validated_data.get('gender')
        password=serializer.validated_data.get('password')
        username = serializer.validated_data.get('username')
        sendemail(email, password)
        userdata=user.objects.create_user(email=email,phone=phone,user_image=image,dept=dept,gender=gender,first_name=first,last_name=second,usertype=usertype1,username=username, password=password)
        images = request.FILES.getlist('image')
        for image in images:
            product_images=degreecertificates.objects.create(degreeimage=image,userid=userdata)
            response_serializer = degreeimgserializer(userdata)

        response_serializer = userserializer(userdata)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def sendemail(email, otp):
    subject = "Greetings from Training Department"
    message = f"""Congratulations,

    You have Successfully Registered.


        Your Login  Credentials
        Email: {email}
        Password: {otp}


        Please use this Password to Login. ⚠️⚠️Don't share Password with anyone⚠️⚠️"""
    sender = "skannan300@gmail.com"
    send_mail(subject, message, sender, [email])



@api_view(['GET'])
def Users(request):
    users=user.objects.all()
    serializer=userserializer(users,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def Departments(request):
    depts=dept.objects.all()
    serializer=deptserializer(depts,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def Loginview(request):
    username=request.data['username']
    password=request.data['password']

    user=authenticate(username=username,password=password)

    if user:
        refresh=RefreshToken.for_user(user)
        if user.is_superuser:
            refresh.payload["user"]=user.is_superuser 
        if user.usertype=='Trainer':     
            refresh.payload["user"]=user.usertype
        if user.usertype=='Trainee':     
            refresh.payload["user"]=user.usertype    
        return Response({"token":str(refresh.access_token)})
    else:
        return Response({"error":"Invalid Credentials"})
    
@api_view(['GET','PUT'])
def Profiledetails(request,pk):
    userprofile=get_object_or_404(user,id=pk)

    if request.method=="GET":
        serializer=userserializer(userprofile)
        return Response(serializer.data)
    
    elif request.method == "PATCH":
        serializer = userserializer(userprofile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    