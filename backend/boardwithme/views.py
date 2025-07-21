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
