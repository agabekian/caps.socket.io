'use strict';
const Chance = require('chance');
const io = require('socket.io-client');
const Shipment = require('./Payload');
const {vendor_says} = require('./vendor');

let serverURL = process.env.SERVER_URL||"http://localhost:3000";
const socket = io.connect(serverURL);

// >>>
setInterval(() => {
    socket.emit('pickup', shippingLabel);
}, 3000);

socket.on('delivered', (payload) => {
    vendor_says(payload.orderId);
})


const chance = new Chance();
const orderId = chance.guid({length: 8});
const shippingLabel = new Shipment(
    "Guitar Center",
    orderId,
    "Armen",
    "Central, 8"
)