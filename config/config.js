"use strict";
const HOST = "localhost";
const PORT = process.env.PORT || 3000;
const SECURITY_CHECK = true;
const ALLOWED_ORIGIN = "http://localhost:" + PORT;
const DATABASE = "BOXED_EATS.db";
const STORE_FEATURED_LIM = 4;
const STORE_KIT_LIM = 24;

//script lists for ejs rendering
const INDEX_SCRIPTS = ["/scripts/index/index.js"];
const U_LOGIN_SCRIPTS = ["/scripts/account-login/login.js"];
const STORE_SCRIPTS = ["/scripts/products/products.js"];
const CART_SCRIPTS = ["/scripts/cart/cart.js"];
const PRODUCT_DETAILS_SCRIPTS = ["/scripts/product-details/product-details.js"];
const ADMIN_PRODUCT_SCRIPTS = ["/scripts/admin/admin-products/admin-products.js"];
const ADMIN_EDIT_SCRIPTS = ["/scripts/admin/product-edit/product-edit.js"];
const ADMIN_UPLOAD_SCRIPTS = ["/scripts/admin/admin-upload/admin-upload.js"];
const NEW_KIT_SCRIPTS = ["/scripts/admin/new-kit/new-kit.js"];

//stylesheet lists for ejs rendering
const INDEX_STYLES = ["/stylesheets/index/index.css"];
const U_LOGIN_STYLES = ["/stylesheets/account-login/login.css"];
const STORE_STYLES = ["/stylesheets/products/products.css"];
const CART_STYLES = ["/stylesheets/cart/cart.css"];
const PRODUCT_DETAILS_STYLES = ["/stylesheets/product-details/product-details.css"];
const ADMIN_PRODUCT_STYLES = ["/stylesheets/admin/admin-products/admin-products.css"];
const ADMIN_EDIT_STYLES = ["/stylesheets/admin/product-edit/product-edit.css"];
const ADMIN_UPLOAD_STYLES = ["/stylesheets/admin/admin-upload/admin-upload.css"];
const NEW_KIT_STYLES = ["/stylesheets/admin/product-edit/product-edit.css"];

module.exports = {
    HOST,
    PORT,
    SECURITY_CHECK,
    ALLOWED_ORIGIN,
    DATABASE,
    STORE_FEATURED_LIM,
    STORE_KIT_LIM,
    INDEX_SCRIPTS,
    U_LOGIN_SCRIPTS,
    STORE_SCRIPTS,
    CART_SCRIPTS,
    PRODUCT_DETAILS_SCRIPTS,
    ADMIN_PRODUCT_SCRIPTS,
    ADMIN_EDIT_SCRIPTS,
    ADMIN_UPLOAD_SCRIPTS,
    NEW_KIT_SCRIPTS,
    INDEX_STYLES,
    U_LOGIN_STYLES,
    STORE_STYLES,
    CART_STYLES,
    PRODUCT_DETAILS_STYLES,
    ADMIN_PRODUCT_STYLES,
    ADMIN_EDIT_STYLES,
    ADMIN_UPLOAD_STYLES,
    NEW_KIT_STYLES
};