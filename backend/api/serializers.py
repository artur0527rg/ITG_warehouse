from rest_framework import serializers
from logic.models import Zone, Line, Place, Order, Pallet


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'bordero', 'vsa', 'color', 'name']


class PalletSerializer(serializers.ModelSerializer):
    order = OrderSerializer()

    class Meta:
        model = Pallet
        fields = ['id', 'order']


class PlaceSerializer(serializers.ModelSerializer):
    pallet = PalletSerializer()

    class Meta:
        model = Place
        fields = ['id', 'position', 'pallet']


class LineSerializer(serializers.ModelSerializer):
    places = PlaceSerializer(many=True)

    class Meta:
        model = Line
        fields = ['id', 'name', 'position', 'places']


class ZoneListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = ['id', 'name', 'position']


class ZoneDetailSerializer(serializers.ModelSerializer):
    lines = LineSerializer(many=True)
    
    class Meta:
        model = Zone
        fields = ['id', 'position', 'name', 'lines']

    def get_lines(self, obj):
        lines = Line.objects.filter(zone=obj).prefetch_related(
            'places__pallets__orders'
        )
        return LineSerializer(lines, many=True).data