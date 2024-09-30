var navSideRef = document.getElementById("navSide");
var extendNavRef = document.getElementById("extendNavButton");
var dismissNavRef = document.getElementById("dismissNavSide");
var cartNavBttnRef = document.getElementById("cartNavBttn");
var navSideIsExtended = false;

extendNavRef.addEventListener("click", sideNavControl);
dismissNavRef.addEventListener("click", sideNavControl);
cartNavBttnRef.addEventListener("click", () => {window.location.href = "./../cart/cart.html"});

function sideNavControl() {
    navSideRef.classList.toggle("extend");
}