function DiscountType(id, type, amount) {
    this.id = id;
    this.type = type;
    this.amount = amount;
}

function DiscountData(discountType, creationTimestamp, expirationTimestamp) {
    this.discountType = discountType;
    this.expirationTimestamp = expirationTimestamp;
    this.creationTimestamp = creationTimestamp;
}

module.exports = {
    DiscountType,
    DiscountData
};