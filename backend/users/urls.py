from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.urls import path
from .views import me, upload_kyc    # ← new import

urlpatterns = [
    path('login/',  TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', me, name='me'),
    path('kyc/', upload_kyc, name='upload-kyc'),   # ← new route
]
