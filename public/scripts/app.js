"use strict";

const navSideRef = document.getElementById("navSide");
const extendNavRef = document.getElementById("extendNavButton");
const dismissNavRef = document.getElementById("dismissNavSide");
const cartNavBttnRef = document.getElementById("cartNavBttn");
const navSideIsExtended = false;

extendNavRef.addEventListener("click", sideNavControl);
dismissNavRef.addEventListener("click", sideNavControl);

function sideNavControl() {
    navSideRef.classList.toggle("extend");
}

//init nav button functionality
const homeBttnRef = document.getElementById("homeBttn");
const storeBttnRef = document.getElementById("storeBttn");
const accountBttnRef = document.getElementById("accountBttn");

homeBttnRef.addEventListener("click", () => {this.window.location.href = "/"});
storeBttnRef.addEventListener("click", () => {this.window.location.href = "/be/kits/store"});
accountBttnRef.addEventListener("click", () => {this.window.location.href = "/be/login"});
cartNavBttnRef.addEventListener("click", () => {window.location.href = "/be/cart"});