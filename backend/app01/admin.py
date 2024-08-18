from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AdminUser, CustomUser, StaffUser


class UserModel(UserAdmin):
    pass

admin.site.register(CustomUser, UserModel)
admin.site.register(AdminUser)
admin.site.register(StaffUser)

# Register your models here.
