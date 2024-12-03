"use strict";
const model = require("../model/be.model.js");
const config = require("../../config/config.js");

function homePage(req, res, next) {
    const samplePromo = {
        title: "Sample Promo",
        description: "This is a sample promo item.",
        link: "#",
        img: ""
    };

    try {
        res.render("index", {
            title: "Boxed Eats - Home",
            scripts: config.INDEX_SCRIPTS,
            stylesheets: config.INDEX_STYLES,
            promoItem: samplePromo,
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function login(req, res, next) {
    try {
        res.render("account-login/login", {
            title: "Boxed Eats - User Login",
            scripts: config.U_LOGIN_SCRIPTS,
            stylesheets: config.U_LOGIN_STYLES,
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function store(req, res, next) {
    const demoKits = [
        {
            id: -1,
            title: "Sample Product",
            description: "This is a sample product.",
            isDiscounted: true,
            price: 99.99,
            discountPrice: 39.99,
            img: "",
            isFeatured: true
        }
    ]

    try {
        res.render("products/products", {
            title: "Boxed Eats - Kits",
            scripts: config.STORE_SCRIPTS,
            stylesheets: config.STORE_STYLES,
            kitList: demoKits
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    homePage,
    login,
    store
};