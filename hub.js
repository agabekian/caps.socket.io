'use strict';
// VENDOR -> HUB -> DRIVER - always include payload!

const port = process.env.PORT || 3000;
const io = require('socket.io')(port);
console.log(port)
// Automatically triggered anytime a client connects
io.on('connection', (socket) => {
    console.log('Connected', socket.id);

    // pickupNotification
    socket.on('pickup', (payload) => {
        logEvent('pickup', payload)
        io.emit('pickup', payload) //id only
    });

    socket.on('in-transit', payload => {
        logEvent('in-transit',payload)
        io.emit('in-transit', payload);
    });

    socket.on('delivered', payload => {
        logEvent('delivered',payload)
        io.emit('delivered', payload);
    });


    // For you all ...
    // socket.on('pickup', order => {
    //     io.emit('pickup', order);
    // });
    //
    // socket.on('in-transit', order => {
    //     io.emit('in-transit', order);
    // });
    //
    // socket.on('delivered', order => {
    //     io.emit('delivered', order);
    // });
});

function logEvent(event, payload) {
    const currentTime = new Date().toISOString();
    console.log(
        `EVENT: {
            event: ${event},
            time: ${currentTime},
            payload: ${JSON.stringify(payload, null, 2)}
        }`
    )
}

// e.on('pickupNotification', (payload) => {
//     logEvent('pickupNotification', payload)
//     e.emit('driverAssigned', payload) //id only
// });
//
// e.on('inTransit', (payload) =>
//     logEvent('inTransit', payload));
//
//
// //Does line 27 belongs here? Should it not come from driver?
// e.on('delivered', (payload) => {
//     console.log("DRIVER: delivered up", payload)
//     e.emit('notifyVendorOK', payload); // inform the VENDOR packaged delivered.
// })

