from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Count

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

@api_view(['DELETE'])
def delete_orphaned_orders(request):
    # Delete every order without pallets
    orphaned_orders = Order.objects.annotate(
        pallet_count=Count('pallets')
    ).filter(pallet_count=0)
    
    count = orphaned_orders.count()
    orphaned_orders.delete()
    
    return Response(
        {'message': f'Successfully deleted {count} orphaned orders'},
        status=status.HTTP_200_OK
    )