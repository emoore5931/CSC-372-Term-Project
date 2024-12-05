"use strict";
const express = require('express');
const router = express.Router();
const cors = require("cors");
const config = require("../../config/config");

const corsOptions = {
    origin: config.ALLOWED_ORIGIN,
    methods: "GET,POST,PUT,DELETE",
    credentials: true
};

router.use(cors(corsOptions));

const controller = require("../controller/be.controller");

router.get("/", controller.homePage);

router.get("/login", controller.login);

router.get("/logout", controller.signOut);

router.get("/kits/store", controller.store);

router.get("/product/:id/info", controller.productInfo);

router.get("/cart", controller.cart);

router.get("/admin", controller.adminProducts);

router.get("/admin/products", controller.adminProducts);

router.get("/admin/upload", controller.adminUpload);

router.get("/admin/edit/:id", controller.adminEdit);

router.get("/admin/sign-out", controller.signOut);

router.post("/admin/upload", controller.upload);

router.delete("/admin/remove-image/:id", controller.removeImage);

router.delete("/admin/remove-kit/:id", controller.removeKit);

module.exports = router;