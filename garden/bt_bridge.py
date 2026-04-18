import serial
import websocket
import time

ser = serial.Serial('/dev/rfcomm0', 115200)  # Linux
# ser = serial.Serial('COM5', 115200)        # Windows

ws = websocket.WebSocket()
ws.connect("ws://127.0.0.1:8000/ws/")

while True:
    data = ser.readline().decode().strip()
    print("ESP32:", data)

    ws.send(data)
    time.sleep(0.1)