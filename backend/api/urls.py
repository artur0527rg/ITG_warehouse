from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
  TokenObtainPairView, TokenRefreshView, TokenVerifyView,
)

from api.views import (
  ZoneViewSet, LineViewSet, PlaceViewSet, OrderViewSet, PalletViewSet,
)

router = DefaultRouter()
router.register(r'zones', ZoneViewSet)
router.register(r'lines', LineViewSet)
router.register(r'places', PlaceViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'pallets', PalletViewSet)

urlpatterns = [
  path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
  path('', include(router.urls)),
]
