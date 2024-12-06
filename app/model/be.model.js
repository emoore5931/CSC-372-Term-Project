"use strict";
const db = require("./db-conn");
const kitDOM = require("./dom/kit.dom");

function getMealKits() {
    return db.all("SELECT * FROM Meal_Kits");
}

function getKitDataByProductName(productName) {
    const productDataList = db.all(`SELECT * FROM Products WHERE name LIKE '%${productName}%'`);
    if (!productDataList) {
        return null;
    }
    const kitDataList = [];
    productDataList.forEach((productData) => {
        kitDataList.push(getKitData(productData.ID));
    });
    return kitDataList;
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

function newUser(userData) {
    db.run("INSERT INTO Users (username, email, password, userTypeID) VALUES (?, ?, ?, ?)", userData.username, userData.email, userData.password, 2);
}

function userExists(username) {
    return db.get("SELECT * FROM Users WHERE username = ?", username) ? true : false;
}

function getUserFromLogin(username, password) {
    return db.get("SELECT * FROM Users WHERE username = ? AND password = ?", username, password);
}

function getUserShoppingCart(userID) {
    return db.all("SELECT * FROM Shopping_Cart_Items WHERE userID = ?", userID);
}

function existsInCart(userID, productID) {
    return db.get("SELECT * FROM Shopping_Cart_Items WHERE userID = ? AND productID = ?", userID, productID) ? true : false;
}

function addProductToCart(userID, productID, quantity) {
    if (existsInCart(userID, productID)) {
        db.run("UPDATE Shopping_Cart_Items SET quantity = ? WHERE userID = ? AND productID = ?", quantity, userID, productID);
        return;
    }

    db.run("INSERT INTO Shopping_Cart_Items (userID, productID, quantity) VALUES (?, ?, ?)", userID, productID, quantity);
}

function removeProductFromCart(userID, productID) {
    db.run("DELETE FROM Shopping_Cart_Items WHERE userID = ? AND productID = ?", userID, productID);
}

function clearCart(userID) {
    db.run("DELETE FROM Shopping_Cart_Items WHERE userID = ?", userID);
}



module.exports = {
    getPromoProduct,
    getAllKitData,
    getKitData,
    newUser,
    userExists,
    getUserFromLogin,
    getUserShoppingCart,
    addProductToCart,
    removeProductFromCart,
    clearCart,
    getKitDataByProductName
};