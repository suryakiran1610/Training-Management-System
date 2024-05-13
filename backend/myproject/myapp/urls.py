from django.urls import path
from . import views

urlpatterns=[
    path('register/',views.Register,name="register"),
    path('users/',views.Users,name="users"),

]