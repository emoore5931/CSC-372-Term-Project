"use strict";
const submitChangesRef = document.getElementById("submitChanges");
const productNameRef = document.getElementById("productNameEdit");
const descriptionRef = document.getElementById("description");
const priceRef = document.getElementById("price");
const isFeaturedRef = document.getElementById("isFeatured");
const categoryIDRef = document.getElementById("categoryID");
const contentsRef = document.getElementById("contents");
const allergensRef = document.getElementById("allergens");
const imagesContainers = document.getElementsByClassName("image-edit-container");
const removeImageButtons = document.getElementsByClassName("remove-image");

submitChangesRef.addEventListener("click", (event) => {
    id = event.currentTarget.dataset.id;
    submitChanges(id);    
});

for (let button of removeImageButtons) {
    button.addEventListener("click", (event) => {
        removeImage(event.currentTarget.dataset.id);
        const container = event.currentTarget.parentElement;
        container.remove();
    });
}

function submitChanges(id) {
    const newProductData = {
        id: id,
        name: productNameRef.value,
        description: descriptionRef.value,
        price: priceRef.value,
        featured: isFeaturedRef.value == "featured" ? 1 : 0,
        categoryID: categoryIDRef.value,
        contents: contentsRef.value,
        allergens: allergensRef.value,
        images: []
    }

    for (let container of imagesContainers) {
        const image = {
            id: container.id.split("image")[1],
            url: container.getElementsByClassName("image-url")[0].value,
            description: container.getElementsByClassName("image-desc")[0].value,
            width: container.getElementsByClassName("image-w")[0].value,
            height: container.getElementsByClassName("image-h")[0].value
        }

        newProductData.images.push(image);
    }
}

function removeImage(id) {
    // todo:
    // Remove image from database
}