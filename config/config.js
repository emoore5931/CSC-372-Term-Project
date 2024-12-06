"use strict";
export const HOST = "localhost";
export const PORT = process.env.PORT || 3000;
export const SECURITY_CHECK = true;
export const ALLOWED_ORIGIN = "http://localhost:" + PORT;
export const DATABASE = "BOXED_EATS.db";
export const STORE_FEATURED_LIM = 4;
export const STORE_KIT_LIM = 24;

//script lists for ejs rendering
export const INDEX_SCRIPTS = ["/scripts/index/index.js"];
export const U_LOGIN_SCRIPTS = ["/scripts/account-login/login.js"];
export const STORE_SCRIPTS = ["/scripts/products/products.js"];
export const CART_SCRIPTS = ["/scripts/cart/cart.js"];
export const PRODUCT_DETAILS_SCRIPTS = ["/scripts/product-details/product-details.js"];
export const ADMIN_PRODUCT_SCRIPTS = ["/scripts/admin/admin-products/admin-products.js"];
export const ADMIN_EDIT_SCRIPTS = ["/scripts/admin/product-edit/product-edit.js"];
export const ADMIN_UPLOAD_SCRIPTS = ["/scripts/admin/admin-upload/admin-upload.js"];
export const NEW_KIT_SCRIPTS = ["/scripts/admin/new-kit/new-kit.js"];

//stylesheet lists for ejs rendering
export const INDEX_STYLES = ["/stylesheets/index/index.css"];
export const U_LOGIN_STYLES = ["/stylesheets/account-login/login.css"];
export const STORE_STYLES = ["/stylesheets/products/products.css"];
export const CART_STYLES = ["/stylesheets/cart/cart.css"];
export const PRODUCT_DETAILS_STYLES = ["/stylesheets/product-details/product-details.css"];
export const ADMIN_PRODUCT_STYLES = ["/stylesheets/admin/admin-products/admin-products.css"];
export const ADMIN_EDIT_STYLES = ["/stylesheets/admin/product-edit/product-edit.css"];
export const ADMIN_UPLOAD_STYLES = ["/stylesheets/admin/admin-upload/admin-upload.css"];
export const NEW_KIT_STYLES = ["/stylesheets/admin/product-edit/product-edit.css"];