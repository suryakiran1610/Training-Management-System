from django.urls import path
from . import views

urlpatterns=[

    path('login/',views.Loginview,name="login"),
    path('register/',views.Register,name="register"),
    path('users/',views.Users,name="users"),
    path('departments/',views.Departments,name="departments"),
    path('profiledetails/<int:pk>',views.Profiledetails,name="profiledetails"),
    path('certificates/',views.Certificates,name="certificates"),
    path('verifypassword/',views.Verifypassword,name="verifypassword"),
    path('allusersprofile/',views.allUsersProfile,name="allusersprofile"),
    path('userlistdelete/<int:pk>',views.Userlistdelete,name='userlistdelete'),

    path('attendence/',views.Attendence,name="attendence"),
    path('trainerattendence/',views.Trainerattendence,name="trainerattendence"),
    path('allUsersProfilefilter/',views.AllUsersProfilefilter,name="allUsersProfilefilter"),
    path('filterrainerattendence/',views.Filterrainerattendence,name="filterrainerattendence"),
    
    path('traineettendencepost/',views.Traineettendencepost,name="traineettendencepost"),
    path('traineeattendence/',views.Traineeattendence,name="traineeattendence"),
    path('alltraineeUsersProfilefilter/',views.AlltraineeUsersProfilefilter,name="alltraineeUsersProfilefilter"),
    path('filterraineeattendence/',views.Filterraineeattendence,name="filterraineeattendence"),

    path('leavesubmit/',views.Leavesubmit,name="leavesubmit"),
    path('leavefilter/',views.Leavefilter,name="leavefilter"),
    path('changeleavestatus/',views.Changeleavestatus,name="changeleavestatus"),

    path('allUsersfilter/',views.AllUsersfilter,name="allUsersfilter"),
    path('deptlistdelete/<int:pk>',views.Deptlistdelete,name='deptlistdelete'),
    path('adddept/',views.Adddept,name="adddept"),
    path('deptedit/<int:pk>',views.Deptedit,name='deptedit'),

    path('addBatch/',views.AddBatch,name="addBatch"),
    path('filteredBatches/',views.FilteredBatches,name="filteredBatches"),
    path('batchdelete/',views.Batchdelete,name="batchdelete"),
    path('filteredBatches1/',views.FilteredBatches1,name="filteredBatches1"),
    path('getallbatches/',views.Getallbatches,name="getallbatches"),


    path('notificationpost/',views.Notificationpost,name="notificationpost"),
    path('getallnotifications/',views.Getallnotifications,name="getallnotifications"),
    path('activateuser/',views.Activateuser,name='activateuser'),
    path('userdeletetable/<int:pk>',views.Userdeletetable,name="userdeletetable"),
    path('notificationdeletetable/<int:pk>',views.Notificationdeletetable,name="notificationdeletetable"),
    path('notificationdeletetableall/',views.Notificationdeletetableall,name="notificationdeletetableall"),
    path('readednotification/',views.Readednotification,name="readednotification"),

    path('filterednotification/',views.Filterednotification,name="filterednotification"),
    path('allleaveget/',views.Allleaveget,name="allleaveget"),
    path('filterednotactiateuser/',views.Filterednotactiateuser,name="filterednotactiateuser"),


    path('trainerBatchfilter/<int:pk>',views.TrainerBatchfilter,name='trainerBatchfilter'),

    path('traineeattendence1/',views.Traineeattendence1,name="traineeattendence1"),
    path('traineePostAttendence1/',views.TraineePostAttendence1,name="traineePostAttendence1"),
    path('filterraineeattendence/',views.Filterraineeattendence,name="filterraineeattendence"),

    path('leavefilterss/',views.Leavefilterss,name="leavefilterss"),

    path('filteredBatchesuserid/',views.FilteredBatchesuserid,name="filteredBatchesuserid"),
    path('addschedule/',views.Addschedule,name="addschedule"),

    path('filterednotificationuserid/',views.Filterednotificationuserid,name="filterednotificationuserid"),
    path('filterednotificationuserid1/',views.Filterednotificationuserid1,name="filterednotificationuserid1"),


    path('notificationpost1/',views.Notificationpost1,name="notificationpost1"),
    path('notificationpost2/',views.Notificationpost2,name="notificationpost2"),


    path('addproject/',views.Addproject,name="addproject"),
    path('filteredproject/',views.Filteredproject,name="filteredproject"),
    path('projectdelete/',views.Projectdelete,name="projectdelete"),

    path('filtertraineeattendence1/',views.Filtertraineeattendence1,name="filtertraineeattendence1"),
    path('notificationpost3/',views.Notificationpost3,name="notificationpost3"),

    path('filterednotificationuserid4/',views.Filterednotificationuserid4,name="filterednotificationuserid4"),
    path('filterednotificationuserid5/',views.Filterednotificationuserid5,name="filterednotificationuserid5"),
    path('filteredprojecttrainee/',views.Filteredprojecttrainee,name="filteredprojecttrainee"),

    path('filteredproject1/',views.Filteredproject1,name="filteredproject1"),
    path('addprojectimage/',views.Addprojectimage,name="addprojectimage"),

    path('notificationpost4/',views.Notificationpost4,name="notificationpost4"),
    path('filteredprojecttrainee1/',views.Filteredprojecttrainee1,name="filteredprojecttrainee1"),
















]