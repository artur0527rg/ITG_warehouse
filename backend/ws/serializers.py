from rest_framework import serializers

from api.serializers import OrderSerializer
from logic.models import Pallet


class WSPalletSerializer(serializers.ModelSerializer):
    order = OrderSerializer()

    class Meta:
        model = Pallet
        fields = ['id', 'order', 'place']
