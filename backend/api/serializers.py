from rest_framework import serializers
from logic.models import Zone, Line, Place, Order, Pallet


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'bordero', 'vsa', 'color', 'name']


class PalletSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all())

    class Meta:
        model = Pallet
        fields = ['id', 'place', 'order']


class PalletDetailSerializer(serializers.ModelSerializer):
    order = OrderSerializer()

    class Meta:
        model = Pallet
        fields = ['id', 'order']


class PlaceDetailSerializer(serializers.ModelSerializer):
    pallet = PalletDetailSerializer()

    class Meta:
        model = Place
        fields = ['id', 'position', 'pallet']


class LineDetailSerializer(serializers.ModelSerializer):
    places = PlaceDetailSerializer(many=True)

    class Meta:
        model = Line
        fields = ['id', 'name', 'position', 'places']


class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = ['id', 'name', 'position']


class ZoneDetailSerializer(serializers.ModelSerializer):
    lines = LineDetailSerializer(many=True)
    
    class Meta:
        model = Zone
        fields = ['id', 'position', 'name', 'lines']

    def get_lines(self, obj):
        lines = Line.objects.filter(zone=obj).prefetch_related(
            'places__pallets__orders'
        )
        return LineDetailSerializer(lines, many=True).data