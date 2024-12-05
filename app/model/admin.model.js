"use strict";
const db = require("./db-conn");
const kitDOM = require("./dom/kit.dom")

function getKitImages(kitID) {
    return db.all("SELECT * FROM Kit_Images WHERE kitID = ?", kitID);
}

function getMealKit(kitID) {
    return db.get("SELECT * FROM Meal_Kits WHERE productID = ?", kitID);
}

function getKitData(kitID) {
    const mealKit = getMealKit(kitID);
    const kitImages = getKitImages(kitID);
    const productData = getProduct(mealKit.productID);
    const discountData = getDiscountDataForKit(kitID);

    return new kitDOM.KitData(productData, mealKit, kitImages, discountData);
}

function getAllKits() {
    return db.all("SELECT * FROM Meal_Kits");
}

function getAllKitData() {
    const kits = getAllKits();
    const kitData = [];
    kits.forEach((kit) => {
        kitData.push(getKitData(kit.productID));
    });

    return kitData;
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

function getAllCategories() {
    return db.all("SELECT * FROM Categories");
}

function getProduct(productID) {
    return db.get("SELECT * FROM Products WHERE id = ?", productID);
}

function uploadKitData(kitData) {   
    const productID = uploadProduct(kitData.productData);
    kitData.mealKitData.productID = productID; 
    kitData.kitImages.kitID = productID;

    uploadMealKit(kitData.mealKitData);
    uploadKitImage(kitData.kitImages);
}

function uploadProduct(product) {
    if (!product.featured || product.featured > 1 || product.featured < 0) { product.featured = 0; }

    db.run("INSERT INTO Products (name, price, description, featured) VALUES (?, ?, ?, ?)",
        product.name, product.price, product.description, product.featured);
    return db.exec("SELECT ID FROM Products ORDER BY ID DESC LIMIT 1");
}

function uploadKitImage(kitImage) {
    return db.run("INSERT INTO Kit_Images (kitID, description, url, width, height) VALUES (?, ?, ?, ?, ?)",
        kitImage.kitID, kitImage.description, kitImage.url, kitImage.width, kitImage.height);
}

function uploadMealKit(mealKit) {
    return db.run("INSERT INTO Meal_Kits (productID, categoryID, contents, allergens) VALUES (?, ?, ?, ?)",
        mealKit.productID, mealKit.categoryID, mealKit.contents, mealKit.allergens);
}


module.exports = {
    uploadKitImage,
    uploadKitData,
    uploadProduct,
    uploadMealKit,
    getAllKitData
};