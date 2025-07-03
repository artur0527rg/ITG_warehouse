from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

from api.views import (
  ZoneViewSet, LineViewSet, PlaceViewSet, OrderViewSet, PalletViewSet,
  delete_orphaned_orders,
)

router = DefaultRouter()
router.register(r'zones', ZoneViewSet)
router.register(r'lines', LineViewSet)
router.register(r'places', PlaceViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'pallets', PalletViewSet)

urlpatterns = [
  path('token-auth/', views.obtain_auth_token),
  path('orders/cleanup/', delete_orphaned_orders, name='orders-cleanup'),
  path('', include(router.urls)),
]
