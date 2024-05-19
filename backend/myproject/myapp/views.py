from django.shortcuts import render
from .models import user
from .models import dept
from .models import degreecertificates
from .models import attendence
from .serializers import userserializer
from .serializers import degreeimgserializer
from .serializers import deptserializer
from .serializers import attendenceserializer
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
    
    elif request.method == "PUT":
        serializer = userserializer(userprofile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
@api_view(['POST','PUT'])
def Verifypassword(request):
        if request.method=="POST":
            oldpass_entered = request.data.get('oldpass') 
            user_id = request.data.get('userid') 
            print(oldpass_entered,user_id)

            try:
                user1 = user.objects.get(id=user_id)
                if user1.check_password(oldpass_entered):
                    return Response({'message': 'Password is verified'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid Password'}, status=status.HTTP_400_BAD_REQUEST)
            except user.DoesNotExist:
                return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
            
        elif request.method=="PUT":    
            newpass_entered = request.data.get('newpass') 
            user_id = request.data.get('userid') 
            print(newpass_entered,user_id)

            try:
                user1 = user.objects.get(id=user_id)
                user1.set_password(newpass_entered)
                user1.save()
                return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)
            except user.DoesNotExist:
                return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def allUsersProfile(request):

    usertype_entered = request.query_params.get('usertype') 
    if usertype_entered:
        usertype=user.objects.filter(usertype=usertype_entered)
        serializer=userserializer(usertype,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)  

@api_view(['DELETE'])
def Userlistdelete(request,pk):
    users=get_object_or_404(user,id=pk)
    users.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)    

@api_view(['POST'])
def Attendence(request):
    serializer=attendenceserializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        name =serializer.validated_data.get('username')
        id=serializer.validated_data.get('userid')
        dept=request.data.get('department')
        date=serializer.validated_data.get('date')
        status=serializer.validated_data.get('status')
        attends=attendence.objects.create(username=name,userid=id,depatment=dept,date=date,status=status)
        response_serializer =attendenceserializer(attends)
        return Response(response_serializer.data)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors)