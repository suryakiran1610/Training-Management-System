from django.shortcuts import render
from .models import user
from .models import dept
from .models import degreecertificates
from .models import attendence
from .models import traineeattendence
from .models import leave
from .models import batch
from .models import notification
from .models import traineeattendence
from .models import project
from .models import projectsubmit
from .serializers import userserializer
from .serializers import degreeimgserializer
from .serializers import deptserializer
from .serializers import attendenceserializer
from .serializers import traineeattendenceserializer
from .serializers import leaveserializer
from .serializers import batchserializer
from .serializers import notificationserializer
from .serializers import traineeattendenceserializer
from .serializers import projectserializer
from .serializers import projectsubmitserializer
from django.core.mail import send_mail
import random
from django.utils import timezone
from datetime import datetime
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
        userdata=user.objects.create_user(email=email,phone=phone,user_image=image,dept=dept,gender=gender,first_name=first,last_name=second,usertype=usertype1,username=username, password=password,is_active=False)
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

        refresh.payload["userfullname"] = user.first_name + " " + user.last_name
        refresh.payload["department"] = user.dept
      
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
    
@api_view(['GET'])
def Trainerattendence(request):
    trainerattendence=attendence.objects.all()
    serializer=attendenceserializer(trainerattendence,many=True)
    return Response(serializer.data)   

@api_view(['GET'])
def AllUsersProfilefilter(request):

    usertype_entered = request.query_params.get('usertype') 
    userdept_entered = request.query_params.get('depts') 
    print(userdept_entered)
    if usertype_entered:
        usertype=user.objects.filter(usertype=usertype_entered,dept=userdept_entered)
        serializer=userserializer(usertype,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)  

@api_view(['GET'])
def Filterrainerattendence(request):

    user_entered = request.query_params.get('userattendence')
    if user_entered:
        users=attendence.objects.filter(userid=user_entered)
        serializer=attendenceserializer(users,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)  



@api_view(['POST'])
def Traineettendencepost(request):
    serializer=traineeattendenceserializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        name =serializer.validated_data.get('username')
        id=serializer.validated_data.get('userid')
        dept=request.data.get('department')
        date=serializer.validated_data.get('date')
        status=serializer.validated_data.get('status')
        attends=traineeattendence.objects.create(username=name,userid=id,depatment=dept,date=date,status=status)
        response_serializer =traineeattendenceserializer(attends)
        return Response(response_serializer.data)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors)    

@api_view(['GET'])
def Traineeattendence(request):
    traineeeattendence=traineeattendence.objects.all()
    serializer=traineeattendenceserializer(traineeeattendence,many=True)
    return Response(serializer.data)      

@api_view(['GET'])
def AlltraineeUsersProfilefilter(request):

    usertype_entered = request.query_params.get('usertype') 
    userdept_entered = request.query_params.get('depts') 
    print(userdept_entered)
    if usertype_entered:
        usertype=user.objects.filter(usertype=usertype_entered,dept=userdept_entered)
        serializer=userserializer(usertype,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)     

@api_view(['GET'])
def Filterraineeattendence(request):

    user_entered = request.query_params.get('userattendence')
    if user_entered:
        users=traineeattendence.objects.filter(userid=user_entered)
        serializer=traineeattendenceserializer(users,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)      
    

@api_view(['POST'])
def Leavesubmit(request):
    serializer=leaveserializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        name =serializer.validated_data.get('username')
        id=serializer.validated_data.get('userid')
        dept=request.data.get('department')
        fromdate1=serializer.validated_data.get('fromdate')
        todate1=serializer.validated_data.get('todate')
        status=serializer.validated_data.get('status')
        type=serializer.validated_data.get('usertype')
        msg=serializer.validated_data.get('message')
        leaves=leave.objects.create(username=name,userid=id,depatment=dept,fromdate=fromdate1,todate=todate1,status=status,usertype=type,message=msg)
        response_serializer =leaveserializer(leaves)
        return Response(response_serializer.data)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors)  

@api_view(['GET'])
def Leavefilter(request):

    usertype_entered = request.query_params.get('usertype') 
    print(usertype_entered)
    if usertype_entered:
        usertype=leave.objects.filter(usertype=usertype_entered)
        serializer=leaveserializer(usertype,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)      

@api_view(['PUT'])
def Changeleavestatus(request):
    status_entered = request.data.get('status') 
    user_id = request.data.get('userid')
    leave_id=request.data.get('leaveid') 
    print(status_entered,user_id)
    try:
        leave_record = leave.objects.get(userid=user_id,id=leave_id)
        leave_record.status = status_entered
        leave_record.save()
        return Response({'message':status_entered}, status=status.HTTP_200_OK)
    except leave.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def AllUsersfilter(request):

    usertype_entered = request.query_params.get('usertype') 
    print(usertype_entered)
    if usertype_entered:
        usertype=user.objects.filter(usertype=usertype_entered)
        serializer=userserializer(usertype,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400) 

@api_view(['DELETE'])
def Deptlistdelete(request,pk):
    depts=get_object_or_404(dept,id=pk)
    depts.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)        


@api_view(['POST'])
def Adddept(request):
    serializer=deptserializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        deptname=request.data.get('departname')
        image = request.FILES.get('dept_image')
        deptdata=dept.objects.create(dept=deptname,dept_image=image)
        response_serializer = deptserializer(deptdata)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def Deptedit(request,pk):
    userdept=get_object_or_404(dept,id=pk)
    
    serializer = deptserializer(userdept, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   

@api_view(['POST'])
def AddBatch(request):
    serializer = batchserializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        dept1 = request.data.get('department')
        trainer1=request.data.get('trainer')
        trainerid1 = request.data.get('trainerid')
        batchname1 = request.data.get('batchname')
        traineeids = request.data.get('traineeid').split(',')
        for trainee_id in traineeids:
            batchdata = batch.objects.create(dept=dept1,trainer=trainer1,trainerid=trainerid1, batchname=batchname1, traineeid=trainee_id.strip()) 
        response_serializer = batchserializer(batchdata)

        return Response(response_serializer.data)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors)

@api_view(['GET'])
def FilteredBatches(request):

    userdept_entered = request.query_params.get('depts') 
    print(userdept_entered)
    if userdept_entered:
        depttype=batch.objects.filter(dept=userdept_entered)
        serializer=batchserializer(depttype,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)  

@api_view(['DELETE'])
def Batchdelete(request):
    batchname_entered = request.query_params.get('depts')
    if batchname_entered: 
        batchs = batch.objects.filter(batchname=batchname_entered)
        batchs.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)   
  

@api_view(['GET'])
def FilteredBatches1(request):

    batchname_entered = request.query_params.get('batchname') 
    print(batchname_entered)
    if batchname_entered:
        filbatch=batch.objects.filter(batchname=batchname_entered)
        serializer=batchserializer(filbatch,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)  

@api_view(['GET'])
def Getallbatches(request):
    allbatches=batch.objects.all()
    serializer=batchserializer(allbatches,many=True)
    return Response(serializer.data)    



@api_view(['POST'])
def Notificationpost(request):
    serializer = notificationserializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        id1 = request.data.get('id')
        name1=request.data.get('name')
        dept1 = request.data.get('dept')
        type1 = request.data.get('type')
        message1 = request.data.get('message')
        usertype1 = request.data.get('usertype')
        trainerid1 =request.data.get('trainerid')
        notificationdata = notification.objects.create(trainerid=trainerid1,userid=id1,username=name1,dept=dept1,type=type1,message=message1,usertype=usertype1) 
        response_serializer = notificationserializer(notificationdata)

        return Response(response_serializer.data)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors)

@api_view(['GET'])
def Getallnotifications(request):
    allnotifi=notification.objects.filter(type__in=["leavesubmit", "userregistration"])
    serializer=notificationserializer(allnotifi,many=True)
    return Response(serializer.data)    


@api_view(['PUT'])
def Activateuser(request):
    user_id = request.data.get('userid') 
    print(user_id)
    try:
        activateuser = user.objects.get(id=user_id)
        activateuser.is_active = 1
        activateuser.save()
        return Response({'message': 'user actiated'}, status=status.HTTP_200_OK)
    except user.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def Userdeletetable(request,pk):
    users=get_object_or_404(user,id=pk)
    users.delete()
    userss=get_object_or_404(notification,userid=pk)
    userss.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)     

@api_view(['DELETE'])
def Notificationdeletetable(request,pk):

    notifi=get_object_or_404(notification,id=pk)
    notifi.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)  

@api_view(['DELETE'])
def Notificationdeletetableall(request):
        notification.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)  

@api_view(['PUT'])
def Readednotification(request):
    notifi_id = request.data.get('notificationid') 
    print(notifi_id)
    try:
        readednotific = notification.objects.get(id=notifi_id)
        readednotific.isread = 1
        readednotific.save()
        return Response({'message': 'Notification Readed'}, status=status.HTTP_200_OK)
    except notification.DoesNotExist:
        return Response({'error': 'Notification does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def Filterednotification(request):
        filnotifi=notification.objects.filter(type__in=["leavesubmit", "userregistration"],isread=0)
        serializer=notificationserializer(filnotifi,many=True)
        return Response(serializer.data)    

@api_view(['GET'])
def Allleaveget(request):
    depts=leave.objects.all()
    serializer=leaveserializer(depts,many=True)
    return Response(serializer.data)  


@api_view(['GET'])
def Filterednotactiateuser(request):
        current_date = timezone.now().date()
        filusr=user.objects.filter(is_active = 0,date_joined__date=current_date)
        serializer=userserializer(filusr,many=True)
        return Response(serializer.data)  


@api_view(['GET'])
def TrainerBatchfilter(request,pk):
    batch1=batch.objects.filter(trainerid=pk)
    serializer=batchserializer(batch1,many=True)
    return Response(serializer.data)
    
@api_view(['GET'])
def Traineeattendence1(request):
    traineeattendence1=traineeattendence.objects.all()
    serializer=traineeattendenceserializer(traineeattendence1,many=True)
    return Response(serializer.data)   

@api_view(['POST'])
def TraineePostAttendence1(request):
    serializer=traineeattendenceserializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        name =serializer.validated_data.get('username')
        id=serializer.validated_data.get('userid')
        dept=request.data.get('department')
        date=serializer.validated_data.get('date')
        status=serializer.validated_data.get('status')
        attends=traineeattendence.objects.create(username=name,userid=id,depatment=dept,date=date,status=status)
        response_serializer =traineeattendenceserializer(attends)
        return Response(response_serializer.data)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors)
    
@api_view(['GET'])
def Leavefilterss(request):

    userid_entered = request.query_params.get('userid') 
    print(userid_entered)
    if userid_entered:
        usertype=leave.objects.filter(userid=userid_entered)
        serializer=leaveserializer(usertype,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)  
    
@api_view(['GET'])
def FilteredBatchesuserid(request):

    userid_entered = request.query_params.get('userid') 
    print(userid_entered)
    if userid_entered:
        batches=batch.objects.filter(trainerid=userid_entered)
        serializer=batchserializer(batches,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)      
  

@api_view(['PUT'])
def Addschedule(request):
    user_time = request.data.get('time')
    user_date = request.data.get('date') 
    user_batch = request.data.get('batchname') 
 
    print(user_time,user_date,user_batch)
    try:
        batches = batch.objects.filter(batchname=user_batch)
        
        if not batches.exists():
            return Response({'error': 'Batch does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        
        for batch1 in batches:
            batch1.time = user_time
            batch1.date = user_date
            batch1.save()

        return Response({'message': 'time and date updated'}, status=status.HTTP_200_OK)
    
    except batch.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)  



@api_view(['GET'])
def Filterednotificationuserid(request):

    userid_entered = request.query_params.get('userid') 
    print(userid_entered)
    if userid_entered:
        noti=notification.objects.filter(trainerid=userid_entered)
        serializer=notificationserializer(noti,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)  
    
@api_view(['GET'])
def Filterednotificationuserid1(request):

    userid_entered = request.query_params.get('userid') 
    print(userid_entered)
    if userid_entered:
        noti=notification.objects.filter(trainerid=userid_entered,isread=0)
        serializer=notificationserializer(noti,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)     
    
@api_view(['POST'])
def Notificationpost1(request):
    serializer = notificationserializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        name1=request.data.get('name')
        dept1 = request.data.get('dept')
        type1 = request.data.get('type')
        message1 = request.data.get('message')
        usertype1 = request.data.get('usertype')
        trainerid1=request.data.get('trainerid')
        id1 = request.data.get('id').split(',')
        for ids in id1: 
            notificationdata = notification.objects.create(trainerid=trainerid1,username=name1,dept=dept1,type=type1,message=message1,usertype=usertype1,userid=ids.strip()) 
        response_serializer = notificationserializer(notificationdata)

        return Response(response_serializer.data)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors)    
    
@api_view(['POST'])
def Addproject(request):
    serializer = projectserializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        projectname1 = request.data.get('projectname')
        batchname1 = request.data.get('batchname')
        trainerid1 = request.data.get('trainerid')
        trainername1 = request.data.get('trainername')
        department1 = request.data.get('department')
        start1 = request.data.get('start')
        end1 = request.data.get('end')
        status1 = request.data.get('status')
        id1 = request.data.getlist('traineeid')
        name1 = request.data.getlist('traineename')

        project_entries = []
        for i in range(len(id1)):
            projectdata = project.objects.create(
                projectname=projectname1,
                batchname=batchname1,
                trainerid=trainerid1,
                trainername=trainername1,
                department=department1,
                start=start1,
                end=end1,
                status=status1,
                traineeid=id1[i].strip(),
                traineename=name1[i],
            )
            project_entries.append(projectdata)

        response_serializer = projectserializer(project_entries, many=True)
        return Response(response_serializer.data)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors)
      

@api_view(['POST'])
def Notificationpost2(request):
    serializer = notificationserializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        dept1 = request.data.get('dept')
        type1 = request.data.get('type')
        message1 = request.data.get('message')
        id1 = request.data.getlist('traineeid')
        for ids in id1: 
            notificationdata = notification.objects.create(dept=dept1,type=type1,message=message1,userid=ids.strip()) 
        response_serializer = notificationserializer(notificationdata)

        return Response(response_serializer.data)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors)    

@api_view(['GET'])
def Filteredproject(request):

    trainerid_entered = request.query_params.get('trainerid') 
    print(trainerid_entered)
    if trainerid_entered:
        project1=project.objects.filter(trainerid=trainerid_entered)
        serializer=projectserializer(project1,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)      

@api_view(['DELETE'])
def Projectdelete(request):
    projectid_entered = request.query_params.get('projectid')
    print(projectid_entered)
    if projectid_entered: 
        projects = project.objects.filter(id=projectid_entered)
        projects.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)        

@api_view(['GET'])
def Filtertraineeattendence1(request):

    user_entered = request.query_params.get('userattendence')
    if user_entered:
        users=traineeattendence.objects.filter(userid=user_entered)
        serializer=traineeattendenceserializer(users,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)  
    

@api_view(['POST'])
def Notificationpost3(request):
    serializer = notificationserializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        id1 = request.data.get('id')
        name1=request.data.get('name')
        dept1 = request.data.get('dept')
        type1 = request.data.get('type')
        message1 = request.data.get('message')
        usertype1 = request.data.get('usertype')
        traineeid1 =request.data.get('traineeid')
        notificationdata = notification.objects.create(userid=traineeid1,username=name1,dept=dept1,type=type1,message=message1,usertype=usertype1) 
        response_serializer = notificationserializer(notificationdata)

        return Response(response_serializer.data)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors)    

@api_view(['GET'])
def Filterednotificationuserid4(request):

    userid_entered = request.query_params.get('userid') 
    print(userid_entered)
    if userid_entered:
        noti=notification.objects.filter(userid=userid_entered)
        serializer=notificationserializer(noti,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)  
    
@api_view(['GET'])
def Filterednotificationuserid5(request):

    userid_entered = request.query_params.get('userid') 
    print(userid_entered)
    if userid_entered:
        noti=notification.objects.filter(userid=userid_entered,isread=0)
        serializer=notificationserializer(noti,many=True)
        return Response(serializer.data)  
    else:
        return Response({"error": "User type not provided"}, status=400)      