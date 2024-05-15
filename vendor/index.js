'use strict';
const io = require('socket.io-client');
const Chance = require('chance');
const Shipment = require('./Payload');
const {vendorThanks} = require('./vendor');

// let serverURL = "https://872d-50-47-110-82.ngrok-free.app";
let serverURL = "http://localhost:3000";
const socket = io.connect(serverURL);

// start
setInterval(() => {
    socket.emit('pickupNotification', shippingLabel);
}, 3000);

socket.on('delivered', (payload) => {
    vendorThanks(payload);
})


const chance = new Chance();
const orderId = chance.guid({length: 8});
const shippingLabel = new Shipment(
    "Guitar Center",
    orderId,
    "Armen",
    "Central, 8"
)