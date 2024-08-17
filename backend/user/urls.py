from django.urls import path
from .views import *


urlpatterns = [
    path('login/', LoginView.as_view(), name="login_url"),
    path('register/', RegisterAPIView.as_view(), name="registration_url"),
    path('logout/', LogoutAPIView.as_view(), name="logout_url"),
    path('user/me/', UserInfo.as_view(), name="user_info"),
    path('password/change/', PasswordChangeView.as_view()),
    path('password/reset/', PasswordResetAPIView.as_view()),
    path('password/reset/confirm/', PasswordResetConfirmAPIView.as_view()),
]
