"use strict";
const db = require("./db-conn");
const kitDOM = require("./dom/kit.dom");

function getMealKits() {
    return db.all("SELECT * FROM Meal_Kits");
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

module.exports = {
    getMealKit,
    getMealKits,
    getPromoProduct,
    getKitImages
};