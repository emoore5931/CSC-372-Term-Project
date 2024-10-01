var galleryImageRefs = document.getElementsByClassName("gallery-image");
var selectedImgDisplayRef = document.getElementById("selectedImgDisplay");

for (let i = 0; i < galleryImageRefs.length; i++) {
    let currItem = galleryImageRefs.item(i);
    currItem.id = "galleryImage" + (i + 1);
    currItem.addEventListener("click", switchImage);
}

/**
 * Switches image displayed in selectedImgDisplay to selected image
 * @param {Event} event 
 */
function switchImage(event) {
    selectedImgDisplayRef.setAttribute("src", event.currentTarget.getAttribute("src"));
}
