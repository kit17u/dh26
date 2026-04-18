from django.urls import re_path
from dh26.consumers import SensorConsumer

websocket_urlpatterns = [
    re_path(r'ws/', SensorConsumer.as_asgi()),
]