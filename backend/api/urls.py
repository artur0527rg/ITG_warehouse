from django.urls import path, include
from rest_framework.routers import DefaultRouter
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
    path('', include(router.urls)),
]
