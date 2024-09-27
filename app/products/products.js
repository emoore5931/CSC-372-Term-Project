var modalContainerRef = document.getElementById("productModalContainer");
var modalRef = document.getElementById("productModal");
var productImageRef = document.getElementById("productImage");
var productNameRef = document.getElementById("productName");
var productDescRef = document.getElementById("productDesc");
var productPriceRef = document.getElementById("productPrice");
var moreInfoBttnRef = document.getElementById("moreInfo");

moreInfoBttnRef.addEventListener("click", () => {window.location.href = "./../product-details/product-details.html"});

function displayProductModal(productId) {
    
    insertModalData(productId);

    modalContainerRef.classList.add("display");
    modalRef.classList.add("display");

    disableScroll();
}

function dismissProductModal() {
    modalContainerRef.classList.remove("display");
    modalRef.classList.remove("display");
    enableScroll();
}

function insertModalData(productId) {
    if (productId < 0) {
        productImageRef.src = "./../../resources/images/stock-photos/temp_promo.jpg";
        productNameRef.innerText = "Product Name";
        productDescRef.innerText = "Product description goes here. This text and all the data for products will be dynamically generated";
        productPriceRef.innerHTML = "$" + "XX.XX";
    } else {
        //call database for modal data
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