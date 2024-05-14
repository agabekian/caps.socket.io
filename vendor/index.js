'use strict';

const e = require('../event-pool');
const Chance = require('chance');
const Shipment = require('./Payload');
const {vendorThanks} = require('./vendor');

const chance = new Chance();
const orderId = chance.guid({length: 8});

const shippingLabel = new Shipment(
    "Guitar Center",
    orderId,
    "Armen",
    "Central, 8"
)

setInterval(() => {
    e.emit('pickupNotification', shippingLabel);
}, 3000);


e.on('notifyVendorOK',(payload)=>{
    vendorThanks(payload);
})