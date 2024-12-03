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

router.get("/cart", controller.cart);

module.exports = router;