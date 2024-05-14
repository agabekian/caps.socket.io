
const io = require('socket.io-client');
const {driverPickedUp,delivered} = require("./driver");
// let serverURL = "https://872d-50-47-110-82.ngrok-free.app";
let serverURL = "http://localhost:3000";
const socket = io.connect(serverURL);


socket.on('pickupNotification', order => {
    console.log("DRIVER: pick up")
    socket.emit('in-transit', order);
});

socket.on('in-transit', order => {
    console.log(`DRIVER: delivered order ${order}`)
    socket.emit('delivered', order);
});






