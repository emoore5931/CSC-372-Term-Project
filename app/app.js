var navSideRef = document.getElementById("navSide");
var extendNavRef = document.getElementById("extendNavButton");
var dismissNavRef = document.getElementById("dismissNavSide");
var navSideIsExtended = false;

extendNavRef.addEventListener("click", sideNavControl);
dismissNavRef.addEventListener("click", sideNavControl);

function sideNavControl() {
    navSideRef.classList.toggle("extend");
}