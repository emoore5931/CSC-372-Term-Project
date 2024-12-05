"use strict";
const db = require("./db-conn");

function getMealKits() {
    return db.all("SELECT * FROM Meal_Kits");
}

function getMealKit(id) {
    return db.get("SELECT * FROM Meal_Kits WHERE id = ?", id);
}

module.exports = {
    getMealKit,
    getMealKits
};