'use strict';


function vendorThanks(id) {
    console.log(`VENDOR: Thank you for delivering ${id}, come again!`)
}

function handlePickup(payload) {
    console.log(`VENDOR: Cool, ${payload.orderId} is on the way!`);
}

module.exports = {
    vendor_says: vendorThanks,
    handlePickup
}
