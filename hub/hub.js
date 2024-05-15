'use strict';
// VENDOR -> HUB -> DRIVER - always include payload!
const Queue = require('./Queue.js'); //lab13

const port = process.env.PORT || 3000;
const io = require('socket.io')(port);

console.log(port)

const orders = new Queue();
// Automatically triggered anytime a client connects
io.on('connection', (socket) => {
    console.log('Connected', socket.id);

    socket.on('ready-for-pickup', (payload) => {
        payload.status = 'queued for pickup';
        orders.enqueue(payload);

        console.log('HUB: Order Queued for Pickup', payload);
        console.log('Orders in the queue:', orders.length());
        console.log('---------------');
        // Add the order to a queue for the drivers to pick up
        // io.emit('pickup', payload);
    });

    socket.on('driver-ready', () => {  // lab_13
        let nextOrder = orders.dequeue();
        if (nextOrder) {
            console.log('HUB: Sending Order to Driver', nextOrder);
            console.log('Orders in the queue:', orders.length());
            console.log('---------------');

            socket.emit('pickup', nextOrder);
        } else {
            console.log('HUB: No Orders in Queue');
            console.log('---------------');
        }
    });


    // From Driver: in transit
    socket.on('package-in-transit', (payload) => {
        payload.status = 'in transit';
        console.log('HUB: Package in Transit', payload);
        console.log('---------------');
        io.emit('in-transit', payload);
    });

    // From driver : package has been delivered
    socket.on('delivered', (payload) => {
        payload.status = 'delivered';
        console.log('HUB: Package Delivered', payload);
        console.log('---------------');
        io.emit('delivered', payload);
    });

    // pickupNotification
    // socket.on('pickup', (payload) => {
    //     logEvent('pickup', payload)
    //     io.emit('pickup', payload) //id only
    // });

    // socket.on('in-transit', payload => {
    //     logEvent('in-transit',payload)
    //     io.emit('in-transit', payload);
    // });

    // socket.on('delivered', payload => {
    //     logEvent('delivered',payload)
    //     io.emit('delivered', payload);
    // });


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

}); //KEEP

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

