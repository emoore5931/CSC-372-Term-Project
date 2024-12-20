"use strict"
const express = require('express');
const app = express();
const ejs = require("ejs");
const multer = require("multer");
const config = require("./config/config");
const cookieParser = require('cookie-parser');

app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const routes = require("./app/route/route");
const { db_close } = require("./app/model/db-conn");


app.set("view engine", "ejs");
app.set("views", __dirname + "/app/views");


app.use(express.static(__dirname + "/public"));
app.use("/be", routes);


app.get("/", (req, res) => {
  res.redirect("/be/");
});

const server = app.listen(config.PORT, function () {
  console.log(`App launched at http://${config.HOST}:${config.PORT}`);
});

process.on("SIGINT", cleanUp);

function cleanUp() {
  console.log("Terminate signal received.");
  db_close();
  console.log("Closing HTTP server...");
  server.close(() => {
    console.log("HTTP server closed.")
  })
}