const io = require('socket.io-client');
let serverURL = process.env.SERVER_URL||"http://localhost:3000";
const socket = io.connect(serverURL);

socket.on('pickup', payload => {
    console.log(`pickup ${payload.orderId}`)
    socket.emit('in-transit', payload);
});

socket.on('in-transit', payload => {
    console.log(`delivered ${payload.orderId}`);
    socket.emit('delivered', payload);
});






