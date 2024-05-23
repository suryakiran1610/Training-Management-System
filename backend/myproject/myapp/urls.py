from django.urls import path
from . import views

urlpatterns=[

    path('login/',views.Loginview,name="login"),
    path('register/',views.Register,name="register"),
    path('users/',views.Users,name="users"),
    path('departments/',views.Departments,name="departments"),
    path('profiledetails/<int:pk>',views.Profiledetails,name="profiledetails"),
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






]