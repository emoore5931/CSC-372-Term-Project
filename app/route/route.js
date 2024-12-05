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

router.get("/kits/store", controller.store);

router.get("/product/:id/info", controller.productInfo);

router.get("/cart", controller.cart);

router.get("/admin", controller.adminProducts);

router.get("/admin/products", controller.adminProducts);

router.get("/admin/upload", controller.adminUpload);

router.get("/admin/edit", controller.adminEdit);

router.get("/admin/sign-out", controller.signOut);

router.post("/admin/upload", controller.upload);

module.exports = router;