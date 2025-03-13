from rest_framework import viewsets

from logic.models import Zone, Line, Place, Order, Pallet
from api.serializers import (
    ZoneSerializer, LineSerializer, PlaceSerializer, OrderSerializer,
    PalletSerializer,
)
from api.filters import (
    LineFilter, PlaceFilter, OrderFilter, PalletFilter,
)


class ZoneViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Zone.objects.all()
    serializer_class = ZoneSerializer

class LineViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Line.objects.all()
    serializer_class = LineSerializer
    filterset_class = LineFilter

class PlaceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    filterset_class = PlaceFilter

class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filterset_class = OrderFilter

class PalletViewSet(viewsets.ModelViewSet):
    queryset = Pallet.objects.all()
    serializer_class = PalletSerializer
    filterset_class = PalletFilter
