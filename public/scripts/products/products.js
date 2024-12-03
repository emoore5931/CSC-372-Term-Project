var modalContainerRef = document.getElementById("productModalContainer");
var modalRef = document.getElementById("productModal");
var productImageRef = document.getElementById("productImage");
var productNameRef = document.getElementById("productName");
var productDescRef = document.getElementById("productDesc");
var productPriceRef = document.getElementById("productPrice");
var moreInfoBttnRef = document.getElementById("moreInfo");
var cartIconBttnRef = document.getElementById("cartIconBttn");

moreInfoBttnRef.addEventListener("click", () => {window.location.href = "./../product-details/product-details.html"});
cartIconBttnRef.addEventListener("click", () => {window.location.href = "./../cart/cart.html"});

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
        productImageRef.src = "./../../resources/images/stock-photos/temp_promo.jpg";
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