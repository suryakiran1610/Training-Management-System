from django.contrib import admin
from .models import user
from .models import dept
from .models import attendence
from .models import traineeattendence
from .models import notification
from .models import project


admin.site.register(user)
admin.site.register(dept)
admin.site.register(attendence)
admin.site.register(traineeattendence)
admin.site.register(notification)
admin.site.register(project)




