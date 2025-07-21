from rest_framework.routers import DefaultRouter
from .views import BoardwithmeAdViewSet

router = DefaultRouter()
router.register(r'ads', BoardwithmeAdViewSet, basename='ad')

urlpatterns = router.urls
