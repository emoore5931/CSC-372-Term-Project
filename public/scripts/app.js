const navSideRef = document.getElementById("navSide");
const extendNavRef = document.getElementById("extendNavButton");
const dismissNavRef = document.getElementById("dismissNavSide");
const cartNavBttnRef = document.getElementById("cartNavBttn");
const navSideIsExtended = false;

extendNavRef.addEventListener("click", sideNavControl);
dismissNavRef.addEventListener("click", sideNavControl);
cartNavBttnRef.addEventListener("click", () => {window.location.href = "./../cart/cart.html"});

function sideNavControl() {
    navSideRef.classList.toggle("extend");
}