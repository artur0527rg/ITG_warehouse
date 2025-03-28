from asgiref.sync import async_to_sync

from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
from channels.layers import get_channel_layer

from .models import Order, Pallet
from api.serializers import OrderSerializer
from ws.serializers import WSPalletSerializer
from ws.consumers import ConsumerGroups, BoardEventTypes


channel_layer = get_channel_layer()

@receiver([post_save, post_delete], sender=Order)
def order_change_signal(instance, **kwargs):
    if kwargs.get('created', False):
        event_type = 'create'
    elif 'created' in kwargs:
        event_type = 'update'
    else:
        event_type = 'delete'

    serialized_object = OrderSerializer(instance).data

    message = {
        'type': BoardEventTypes.ORDER,
        'event': event_type,
        'data': serialized_object,
    }

    async_to_sync(channel_layer.group_send)(
        ConsumerGroups.BOARD,
        message,
    )
    

@receiver([post_save, post_delete], sender=Pallet)
def order_change_signal(instance, **kwargs):
    if kwargs.get('created', False):
        event_type = 'create'
    elif 'created' in kwargs:
        event_type = 'update'
    else:
        event_type = 'delete'

    serialized_object = WSPalletSerializer(instance).data

    message = {
        'type': BoardEventTypes.PALLET,
        'event': event_type,
        'data': serialized_object,
    }

    async_to_sync(channel_layer.group_send)(
        ConsumerGroups.BOARD,
        message,
    )