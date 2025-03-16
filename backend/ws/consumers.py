import json
from enum import StrEnum
from asgiref.sync import async_to_sync

from channels.generic.websocket import WebsocketConsumer


class ConsumerGroups(StrEnum):
    BOARD = 'board'


class BoardEventTypes(StrEnum):
    PALLET = 'pallet.update'
    ORDER = 'order.update'


class BoardConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            ConsumerGroups.BOARD, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            ConsumerGroups.BOARD, self.channel_name
        )

    def receive(self, text_data):
        self.send(text_data='pong')
        async_to_sync(self.channel_layer.group_send)(
            ConsumerGroups.BOARD,
            {"type": BoardEventTypes.PALLET, "message": 'message'},
        )

    def order_update(self, event):
        self.send(text_data=json.dumps(event))

    def pallet_update(self, event):
        self.send(text_data=json.dumps(event))