'use strict';

function vendorThanks(id){
    console.log(`VENDOR: Thank you for delivering ${id}, come again!`)
}

module.exports = {
    vendor_says: vendorThanks,
}
