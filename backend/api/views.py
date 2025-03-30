from rest_framework import viewsets

from logic.models import Zone, Line, Place, Order, Pallet
from api.serializers import (
    OrderSerializer, PalletSerializer, PalletDetailSerializer,
    PlaceDetailSerializer, LineDetailSerializer, ZoneSerializer,
    ZoneDetailSerializer,
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

class PlaceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceDetailSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filterset_fields = ['name', 'bordero', 'vsa']
    search_fields = ['name', 'bordero', 'vsa']

class PalletViewSet(viewsets.ModelViewSet):
    queryset = Pallet.objects.all()
    serializer_class = PalletSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return PalletSerializer
        return PalletDetailSerializer
