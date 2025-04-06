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


class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['id', 'position', 'line']


class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = ['id', 'name', 'position', 'zone']


class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = ['id', 'name', 'position']