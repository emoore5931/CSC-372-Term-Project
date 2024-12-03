"use strict";
export const HOST = "localhost";
export const PORT = process.env.PORT || 3000;
export const SECURITY_CHECK = true;
export const ALLOWED_ORIGIN = "http://localhost:" + PORT;
export const DATABASE = "BOXED_EATS.db";

//script lists for ejs rendering
export const INDEX_SCRIPTS = ["/scripts/index/index.js"];
export const U_LOGIN_SCRIPTS = ["/scripts/account-login/login.js"];
export const STORE_SCRIPTS = ["/scripts/products/products.js"];
export const CART_SCRIPTS = ["/scripts/cart/cart.js"];

//stylesheet lists for ejs rendering
export const INDEX_STYLES = ["/stylesheets/index/index.css"];
export const U_LOGIN_STYLES = ["/stylesheets/account-login/login.css"];
export const STORE_STYLES = ["/stylesheets/products/products.css"];
export const CART_STYLES = ["/stylesheets/cart/cart.css"];