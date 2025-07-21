# backend/boardwithme/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "message": "BoardWithMe API is running 🚌",
        "endpoints": {
            "admin": "/admin/",
            "auth": "/api/auth/",
            "trips": "/api/trips/",
            "ads": "/api/ads/",
            "bookings": "/api/bookings/",
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/', include('trips.urls')),
    path('api/', include('ads.urls')),
    path('api/', include('bookings.urls')),
    path('api/', include('payments.urls')),
    path('', api_root),  # root URL
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
