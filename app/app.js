var navSideRef = document.getElementById("navSide");
var navSideIsExtended = false;

function sideNavControl() {
    if (navSideIsExtended) {
        navSideRef.style.display = "none";
        navSideIsExtended = false;
    } else {
        navSideRef.style.display = "block";
        navSideIsExtended = true;
    }
}