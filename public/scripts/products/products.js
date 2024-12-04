"use strict";
const modalContainerRef = document.getElementById("productModalContainer");
const modalRef = document.getElementById("productModal");
const productImageRef = document.getElementById("productImage");
const productNameRef = document.getElementById("productName");
const productDescRef = document.getElementById("productDesc");
const productPriceRef = document.getElementById("productPrice");
const moreInfoBttnRef = document.getElementById("moreInfo");
const cartIconBttnRef = document.getElementById("cartIconBttn");

cartIconBttnRef.addEventListener("click", () => {window.location.href = "/be/cart"});

function Kit(kitId, kitTitle, kitDesc, kitPrice, kitImg, isDiscounted, discountPrice) {
    this.id = kitId;
    this.img = kitImg;
    this.title = kitTitle;
    this.description = kitDesc;
    this.price = kitPrice;
    this.isDiscounted = isDiscounted;
    this.discountPrice = discountPrice;
}

function displayProductModal(kit) {
    
    insertModalData(kit);

    modalContainerRef.classList.add("display");
    modalRef.classList.add("display");

    disableScroll();
}

function dismissProductModal() {
    modalContainerRef.classList.remove("display");
    modalRef.classList.remove("display");
    enableScroll();
}

function insertModalData(kit) {
    if (!kit) {
        productImageRef.src = "/img/stock-photos/temp_promo.jpg";
        productNameRef.innerText = "Product Name";
        productDescRef.innerText = "Product description goes here. This text and all the data for products will be dynamically generated";
        productPriceRef.innerHTML = "$" + "XX.XX";
    } else {
        productImageRef.src = kit.img;
        productNameRef.innerText = kit.title;
        productDescRef.innerText = kit.description;
        if (kit.isDiscounted) {
            productPriceRef.innerHTML = "<del>$" + kit.price + "</del> <ins>$" + kit.discountPrice + "</ins>";
        } else {
            productPriceRef.innerHTML = "$" + kit.price;
        }
        moreInfoBttnRef.addEventListener("click", () => {window.location.href = `/be/product/${kit.id}/info`});
    }
}

/**
 * Disables scroll function for modal.
 */
function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

/**
 * Reenables scroll function for modal.
 */
function enableScroll() {
    window.onscroll = function () { };
}