/*
  Name: Ethan Moore
  Date: 10.16.2024
  CSC 372-01

  Scripting for all admin pages.
*/

const navRef = document.getElementsByTagName("nav");

initNavButtons();

function initNavButtons() {
    if (navRef.length < 1) {
        console.error("Unable to find nav element");
    } else {
        let buttons = navRef.item(0).children
        buttons.item(0).addEventListener("click", () => {
            window.location.href = "/be/admin/products";
        });
        buttons.item(1).addEventListener("click", () => {
            window.location.href = "/be/admin/upload";
        });
        buttons.item(2).addEventListener("click", () => {
            window.location.href = "/be/admin/kits/new";
        });
        buttons.item(3).addEventListener("click", () => {
            window.location.replace("/be/admin/sign-out");
        });
    }
}