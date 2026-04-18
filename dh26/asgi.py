"""
ASGI config for dh26 project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import dh26.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dh26.settings')

asgi_application = get_asgi_application()

application = ProtocolTypeRouter({
    "http": asgi_application,
    "websocket": URLRouter(
        dh26.routing.websocket_urlpatterns
    ),
})
