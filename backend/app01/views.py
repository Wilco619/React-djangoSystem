# app01/views.py

from datetime import timedelta
from django.utils import timezone
from rest_framework import status
import random
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.core.mail import send_mail
from .models import CustomUser
from .serializers import AdminUserSerializer, CustomerSerializer, StaffUserSerializer

class AdminUserRegistrationView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = AdminUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StaffUserRegistrationView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = StaffUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CustomerRegistrationView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        
        User = get_user_model()

        try:
            # Look up the user by email
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # Authenticate using the user's username (or email if it’s the username field)
        user = authenticate(username=user.username, password=password)

        if user is not None:
            otp = str(random.randint(100000, 999999))
            user.otp = otp
            user.otp_generated_at = timezone.now()  # Set the current time
            user.save()

            # Display OTP in terminal
            print(f'OTP for {user.email}: {otp}')

            return Response({
                'message': 'OTP generated. Check the terminal for the code.',
                'user_id': user.id,   # Send user ID to use in OTP verification
            })
        
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        otp = request.data.get('otp')

        try:
            user = CustomUser.objects.get(id=user_id)

            # Check if OTP is expired
            if user.otp_generated_at and (timezone.now() - user.otp_generated_at) > timedelta(hours=2):
                return Response({"error": "OTP has expired"}, status=status.HTTP_400_BAD_REQUEST)

            if user.otp == otp:
                # OTP is correct, clear OTP and return success
                user.otp = None
                user.otp_generated_at = None
                user.save()

                # Generate token for the user
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'token': token.key,
                    'user_type': user.user_type
                })
            else:
                return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
