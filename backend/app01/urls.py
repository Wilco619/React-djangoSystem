from django.urls import path
from .views import AdminUserRegistrationView, CustomerRegistrationView, LoginView, StaffUserRegistrationView, VerifyOTPView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/admin/', AdminUserRegistrationView.as_view(), name='register-admin'),
    path('register/staff/', StaffUserRegistrationView.as_view(), name='register-staff'),
    path('register/customer/', CustomerRegistrationView.as_view(), name='register-customer'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),  # Added endpoint for OTP verification
]



