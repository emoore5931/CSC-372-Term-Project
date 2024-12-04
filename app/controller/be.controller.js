"use strict";
const model = require("../model/be.model.js");
const config = require("../../config/config.js");

function homePage(req, res, next) {
    const samplePromo = {
        title: "Sample Promo",
        description: "This is a sample promo item.",
        link: "/be/product/-1/info",
        img: "/img/stock-photos/temp_promo.jpg"
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

function cart(req, res, next) {
    const sampleCartProducts = [{
        id: -1,
        title: "Sample Product",
        price: 99.99,
        img: "",
        isDiscounted: true,
        discountedPrice: 39.99,
        quantity: 1
    }];

    try {
        res.render("cart/cart", {
            title: "Boxed Eats - Cart",
            scripts: config.CART_SCRIPTS,
            stylesheets: config.CART_STYLES,
            productList: sampleCartProducts
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function adminProducts(req, res, next) {
    try {
        res.render("admin/admin-products/admin-products", {
            title: "Product Listing",
            scripts: config.ADMIN_PRODUCT_SCRIPTS,
            stylesheets: config.ADMIN_PRODUCT_STYLES,
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function adminUpload(req, res, next) {
    try {
        res.render("admin/admin-upload/admin-upload", {
            title: "Bulk Upload",
            scripts: config.ADMIN_UPLOAD_SCRIPTS,
            stylesheets: config.ADMIN_UPLOAD_STYLES,
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function adminEdit(req, res, next) {
    try {
        res.render("admin/product-edit/product-edit", {
            title: "Product Edit",
            scripts: config.ADMIN_EDIT_SCRIPTS,
            stylesheets: config.ADMIN_EDIT_STYLES,
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function productInfo(req, res, next) {
    const sampleProduct = {
        id: -1,
        title: "Bento Box Kit",
        description: "This is a sample product.",
        price: 39.99,
        images: ["/img/stock-photos/temp_promo.jpg"],
        isDiscounted: true,
        contents: ["Salmon Rice Balls with a side of carrots", "Bulgolgi Beef with a side of eggs"],
        allergens: ["Fish", "Soy", "Wheat"]
    };

    try {
        res.render("product-details/product-details", {
            title: `Boxed Eats - ${sampleProduct.title}`,
            product: sampleProduct,
            scripts: config.PRODUCT_DETAILS_SCRIPTS,
            stylesheets: config.PRODUCT_DETAILS_STYLES
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
    store,
    cart,
    adminProducts,
    adminUpload,
    adminEdit,
    productInfo
};