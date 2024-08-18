from rest_framework import serializers
from .models import CustomUser, AdminUser, Customer, StaffUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'user_type']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class AdminUserSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = AdminUser
        fields = ['id', 'user', 'gender', 'address', 'i_d', 'phone']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUserSerializer.create(CustomUserSerializer(), validated_data=user_data)
        admin_user = AdminUser.objects.create(admin=user, **validated_data)
        return admin_user

class StaffUserSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = StaffUser
        fields = ['id', 'user', 'gender', 'address', 'i_d', 'phone']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUserSerializer.create(CustomUserSerializer(), validated_data=user_data)
        staff_user = StaffUser.objects.create(admin=user, **validated_data)
        return staff_user
    
class CustomerSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = StaffUser
        fields = ['id', 'user', 'gender', 'address', 'i_d', 'phone']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUserSerializer.create(CustomUserSerializer(), validated_data=user_data)
        customer = Customer.objects.create(admin=user, **validated_data)
        return customer
