# app01/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


class CustomUser(AbstractUser):
    user_type_data = ((1, "AdminUser"), (2, "StaffUser"), (3, "Customer"))
    user_type = models.CharField(default=1, choices=user_type_data, max_length=10)
    otp = models.CharField(max_length=6, null=True, blank=True)
    otp_generated_at = models.DateTimeField(null=True, blank=True) 


class AdminUser(models.Model):
    id = models.AutoField(primary_key=True)
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    gender = models.CharField(max_length=50)
    address = models.TextField()
    i_d = models.CharField(max_length=8)
    phone = models.CharField(max_length=12)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

class StaffUser(models.Model):
    id = models.AutoField(primary_key=True)
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    gender = models.CharField(max_length=50)
    address = models.TextField()
    i_d = models.CharField(max_length=8)
    phone = models.CharField(max_length=12)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    gender = models.CharField(max_length=50)
    address = models.TextField()
    i_d = models.CharField(max_length=8)
    phone = models.CharField(max_length=12)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.user_type == 1:
            AdminUser.objects.create(admin=instance, address="", gender="")
        elif instance.user_type == 2:
            StaffUser.objects.create(admin=instance, address="", gender="")

@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance, **kwargs):
    if instance.user_type == 1:
        instance.adminuser.save()
    elif instance.user_type == 2:
        instance.staffuser.save()
    elif instance.user_type == 3:
        instance.customer.save()



















