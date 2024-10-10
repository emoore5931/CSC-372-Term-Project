var galleryImageRefs = document.getElementsByClassName("gallery-image");
var selectedImgDisplayRef = document.getElementById("selectedImgDisplay");

document.getElementById("previousImage").addEventListener("click", previousImage);
document.getElementById("nextImage").addEventListener("click", nextImage);

for (let i = 1; i <= galleryImageRefs.length; i++) {
    let currItem = galleryImageRefs.item(i - 1);
    currItem.id = "galleryImage" + i;
    currItem.addEventListener("click", switchImage);
}

/**
 * Switches image displayed in selectedImgDisplay to selected image
 * @param {Event} event 
 */
function switchImage(event) {
    let currentTarget = event.currentTarget;
    selectedImgDisplayRef.setAttribute("src", currentTarget.getAttribute("src"));
    selectedImgDisplayRef.setAttribute("current-image-id", currentTarget.getAttribute("id"));
}

function nextImage() {
    let currentImageId = selectedImgDisplayRef.getAttribute("current-image-id");
    let imageIdNum = currentImageId.slice(12);
    imageIdNum++;
    if (imageIdNum > galleryImageRefs.length) {
        imageIdNum = 1;
    }
    let newImageId = "galleryImage" + imageIdNum;
    selectedImgDisplayRef.setAttribute("current-image-id", newImageId);
    selectedImgDisplayRef.setAttribute("src", document.getElementById(newImageId).getAttribute("src"));
}

function previousImage() {
    let currentImageId = selectedImgDisplayRef.getAttribute("current-image-id");
    let imageIdNum = currentImageId.slice(12);
    imageIdNum--;
    if (imageIdNum <= 0) {
        imageIdNum = galleryImageRefs.length;
    }
    let newImageId = "galleryImage" + imageIdNum;
    selectedImgDisplayRef.setAttribute("current-image-id", newImageId);
    selectedImgDisplayRef.setAttribute("src", document.getElementById(newImageId).getAttribute("src"));
}