"use strict";

const heroButtonRef = document.getElementById("heroButton");
const viewPromoButtonRef = document.getElementById("viewPromo");

heroButtonRef.addEventListener("click", () => { window.location.href = "/be/kits/store" });

viewPromoButtonRef.addEventListener("click", () => { window.location.href = viewPromoButtonRef.dataset.promoLink });