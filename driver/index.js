const io = require('socket.io-client');

let serverURL = process.env.SERVER_URL || "http://localhost:3000";

const socket = io.connect(serverURL);

socket.emit('driver-ready')

socket.on('pickup', handlePickup);

function handlePickup(payload) {

    setTimeout(() => {
        console.log('DRIVER: Picked Up', payload.orderId);
        socket.emit('package-in-transit', payload);
    }, 1000);

    setTimeout(() => {
        console.log('DRIVER: Delivered', payload.orderId);
        socket.emit('delivered', payload);
        socket.emit('driver-ready');
    }, 4000);

}

//lab12
// socket.on('pickup', payload => {
//     console.log(`pickup ${payload.orderId}`)
//     socket.emit('in-transit', payload);
// });

// socket.on('in-transit', payload => {
//     console.log(`delivered ${payload.orderId}`);
//     socket.emit('delivered', payload);
// });






