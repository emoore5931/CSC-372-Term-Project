"use strict";
const db = require("./db-conn");
const kitDOM = require("./dom/kit.dom");

function getMealKits() {
    return db.all("SELECT * FROM Meal_Kits");
}

function getKitData(kitID) {
    const mealKit = getMealKit(kitID);
    const kitImages = getKitImages(kitID);
    const productData = getProduct(kitID);
    const discountData = getDiscountDataForKit(kitID);

    return new kitDOM.KitData(productData, mealKit, kitImages, discountData);
}

function getKitImages(kitID) {
    return db.all("SELECT * FROM Kit_Images WHERE kitID = ?", kitID);
}

function getMealKit(kitID) {
    return db.get("SELECT * FROM Meal_Kits WHERE productID = ?", kitID);
}

function getProduct(productID) {
    return db.get("SELECT * FROM Products WHERE id = ?", productID);
}

function getDiscountDataForKit(kitID) {
    const discount = db.get("SELECT * FROM Discounted_Kits WHERE kitID = ? ORDER BY creationTimestamp DESC", kitID);
    
    if (!discount) {
        return null;
    }

    const discountType = getDiscountType(discount.typeID);

    return new DiscountData(discountType, discount.creationTimestamp, discount.expirationTimestamp);
}

function getDiscountType(discountTypeID) {
    return db.get("SELECT * FROM Discount_Types WHERE id = ?", discountTypeID);
}

function getMealKit(id) {
    return db.get("SELECT * FROM Meal_Kits WHERE productID = ?", id);
}

function getKitImages(kitID) {
    return db.all("SELECT * FROM Kit_Images WHERE kitID = ?", kitID);
}

function getPromoProduct() {
    const productData = db.get("SELECT * FROM Products WHERE featured = ?", 1);
    return new kitDOM.KitData(
        productData,
        null,
        getKitImages(productData.ID),
        null
    )
}

function getAllKitData() {
    const kits = getMealKits();
    const kitData = [];
    kits.forEach((kit) => {
        kitData.push(getKitData(kit.productID));
    });

    return kitData;
}

module.exports = {
    getPromoProduct,
    getAllKitData
};