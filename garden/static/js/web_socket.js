const socket = new WebSocket("ws://127.0.0.1:8000/ws/");

socket.onmessage = (event) => {
    console.log("Sensor value:", event.data);
};