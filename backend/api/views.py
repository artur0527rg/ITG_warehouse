from rest_framework import viewsets

from logic.models import Zone, Line, Place, Order, Pallet
from api.serializers import (
    PalletSerializer, OrderSerializer, PlaceSerializer, LineSerializer,
    ZoneSerializer,
)


class ZoneViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Zone.objects.all()
    serializer_class = ZoneSerializer


class LineViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Line.objects.all()
    serializer_class = LineSerializer
    filterset_fields = ['zone']


class PlaceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    filterset_fields = {
        'line': ['exact', 'in'],
    }


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filterset_fields = ['id',]
    filterset_fields = {
        'id': ['exact', 'in'],
    }

    search_fields = ['name', 'bordero', 'vsa']


class PalletViewSet(viewsets.ModelViewSet):
    queryset = Pallet.objects.all()
    serializer_class = PalletSerializer
    filterset_fields = {
        'place': ['exact', 'in'],
    }
