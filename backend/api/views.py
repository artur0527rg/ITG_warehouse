from rest_framework import viewsets

from logic.models import Zone, Line, Place, Order, Pallet
from api.serializers import (
    OrderSerializer, PalletSerializer, PalletDetailSerializer,
    PlaceDetailSerializer, LineDetailSerializer, ZoneSerializer,
    ZoneDetailSerializer,
)
from api.filters import (
    LineFilter, PlaceFilter, OrderFilter, PalletFilter,
)


class ZoneViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Zone.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ZoneSerializer
        return ZoneDetailSerializer

class LineViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Line.objects.all()
    serializer_class = LineDetailSerializer
    filterset_class = LineFilter

class PlaceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceDetailSerializer
    filterset_class = PlaceFilter

class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filterset_class = OrderFilter

class PalletViewSet(viewsets.ModelViewSet):
    queryset = Pallet.objects.all()
    serializer_class = PalletSerializer
    filterset_class = PalletFilter

    def get_serializer_class(self):
        if self.action == 'create':
            return PalletSerializer
        return PalletDetailSerializer
