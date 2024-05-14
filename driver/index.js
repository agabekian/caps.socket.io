const e = require('../event-pool');
const driver = require('./driver');
const {driverPickedUp,delivered} = require("./driver");

e.on('driverAssigned', (payload) => {

  driverPickedUp(payload.orderId);

  e.emit('inTransit', payload)

  e.emit('delivered', payload.orderId)

});


