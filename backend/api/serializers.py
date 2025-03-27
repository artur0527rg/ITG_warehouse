from rest_framework import serializers
from logic.models import Zone, Line, Place, Order, Pallet


class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = ['id', 'name', 'position']


class LineSerializer(serializers.ModelSerializer):
    zone = serializers.PrimaryKeyRelatedField(queryset=Zone.objects.all())

    class Meta:
        model = Line
        fields = ['id', 'zone', 'name', 'position']


class PlaceSerializer(serializers.ModelSerializer):
    line = serializers.PrimaryKeyRelatedField(queryset=Line.objects.all())

    class Meta:
        model = Place
        fields = ['id', 'line', 'position']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'bordero', 'vsa', 'color', 'description']


class PalletSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all())
    place = serializers.PrimaryKeyRelatedField(queryset=Place.objects.all())

    class Meta:
        model = Pallet
        fields = ['id', 'order', 'place']
