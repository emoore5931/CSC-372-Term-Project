"use strict";
const modalContainerRef = document.getElementById("productModalContainer");
const modalRef = document.getElementById("productModal");
const productImageRef = document.getElementById("productImage");
const productNameRef = document.getElementById("productName");
const productDescRef = document.getElementById("productDesc");
const productPriceRef = document.getElementById("productPrice");
const moreInfoBttnRef = document.getElementById("moreInfo");
const cartIconBttnRef = document.getElementById("cartIconBttn");
const featuredDealsContainerRef = document.getElementById("featuredDeals");
const allKitsContainerRef = document.getElementById("allKits");
const featuredDealsPrevRef = document.getElementById("featuredDealsPrevious");
const featuredDealsNextRef = document.getElementById("featuredDealsNext");
const allKitsPrevRef = document.getElementById("allKitsPrevious");
const allKitsNextRef = document.getElementById("allKitsNext");

const featuredDealsManager = {
    index: 0,
    limit: parseInt(featuredDealsContainerRef.dataset.limit),
};

const allKitsManager = {
    index: 0,
    limit: parseInt(allKitsContainerRef.dataset.limit),
};

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
        console.log(kit.isDiscounted);
        if (kit.isDiscounted == "true") {
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

function range(start, end) {
    const range = [];
    if (start < end) {
        for (let i = start; i < end; i++) {
            range.push(i);
        }
    } else {
        for (let i = start; i > end; i--) {
            range.push(i);
        }
    }
    return range;
}

function viewNext(containerRef, managerObj) {
    const index = managerObj.index;
    const limit = managerObj.limit;
    const cards = containerRef.children;
    const cardsToHide = range(index, (index + limit));
    const cardsToShow = range(index + limit, (index + 2 * limit));

    if (index + limit >= cards.length) {
        //out of bounds
        return;
    }

    // hide current cards
    cardsToHide.forEach((i) => {
        cards.item(i).classList.toggle("hidden");
    });
    // show next cards
    cardsToShow.forEach((i) => {
        if (i < cards.length) {
            cards.item(i).classList.toggle("hidden");
            managerObj.index++;
        }
    });
}

function viewPrevious(containerRef, managerObj) {
    const index = managerObj.index;
    const limit = managerObj.limit;
    const cards = containerRef.children;
    const cardsToHide = range(index, (index + limit));
    const cardsToShow = range(index - 1, ((index - 1) - limit));

    if (index - limit < 0) {
        //out of bounds
        return;
    }

    // hide current cards
    cardsToHide.forEach((i) => {
        cards.item(i).classList.toggle("hidden");
    });
    // show next cards
    cardsToShow.forEach((i) => {
        if (i >= 0) {
            cards.item(i).classList.toggle("hidden");
            managerObj.index--;
        }
    });
}

function initPagination() {
    featuredDealsNextRef.addEventListener("click", () => { viewNext(featuredDealsContainerRef, featuredDealsManager) });
    featuredDealsPrevRef.addEventListener("click", () => { viewPrevious(featuredDealsContainerRef, featuredDealsManager) });
    allKitsNextRef.addEventListener("click", () => { viewNext(allKitsContainerRef, allKitsManager) });
    allKitsPrevRef.addEventListener("click", () => { viewPrevious(allKitsContainerRef, allKitsManager) });
}


initPagination();