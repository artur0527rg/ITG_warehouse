import json
from enum import StrEnum
from asgiref.sync import async_to_sync

from channels.generic.websocket import WebsocketConsumer


class ConsumerGroups(StrEnum):
    BOARD = 'board'


class BoardEventTypes(StrEnum):
    PALLET = 'pallet_update'
    ORDER = 'order_update'


class BoardConsumer(WebsocketConsumer):
    async def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            ConsumerGroups.BOARD, self.channel_name
        )
        print(self.scope['user'])
        self.accept()

    async def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            ConsumerGroups.BOARD, self.channel_name
        )

    async def receive(self, text_data):
        # Send message to room group
        self.send(text_data='pong')
        async_to_sync(self.channel_layer.group_send)(
            ConsumerGroups.BOARD,
            {"type": BoardEventTypes.PALLET, "message": 'message'},
        )

    # Receive message from room group
    async def pallet_update(self, event):
        message = event["message"]
        self.send(text_data=json.dumps({"message": message}))