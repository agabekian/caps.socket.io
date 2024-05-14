
'use strict';

function vendorThanks(id){
    console.log(`VENDOR: Thank you for delivering ${id}, come again!`)
}
function delivered(id) {
    console.log("delivered up", id);
}
module.exports = {
    vendorThanks,
    delivered
}
