from channels.generic.websocket import WebsocketConsumer

class SensorConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def receive(self, text_data):
        print("From ESP32:", text_data)