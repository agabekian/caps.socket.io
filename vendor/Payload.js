
class Payload {
    constructor(store, status, orderId, customer, address) {
        this.store = store;
        this.status = status;
        this.orderId = orderId;
        this.customer = customer;
        this.address = address;
    }
}

module.exports = Payload;