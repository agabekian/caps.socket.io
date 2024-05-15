
const io = require('socket.io-client');
// let serverURL = "https://872d-50-47-110-82.ngrok-free.app";
let serverURL = "http://localhost:3000";
const socket = io.connect(serverURL);


socket.on('pickup', payload => {
    console.log(`pickup ${payload.orderId}`)
    socket.emit('in-transit', payload);
});

socket.on('in-transit', payload => {
    console.log(`delivered ${payload.orderId}`);
    socket.emit('delivered', payload);
});






