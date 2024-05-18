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



]