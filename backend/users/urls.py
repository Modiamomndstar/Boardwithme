from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.urls import path
from .views import me, upload_kyc, register, update_profile    # ← new import

urlpatterns = [
    path('login/',  TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', me, name='me'),
    path('register/', register, name='register'),
]

urlpatterns += [
    path('kyc/', upload_kyc, name='upload_kyc'),
    path('profile/update/', update_profile, name='update_profile'),
]
