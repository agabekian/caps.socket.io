
class Payload {
    constructor(store, orderId, customer, address) {
        this.store = store;
        this.orderId = orderId;
        this.customer = customer;
        this.address = address;
    }
}

module.exports = Payload;