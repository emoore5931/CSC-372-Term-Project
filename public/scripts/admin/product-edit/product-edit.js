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
        description: descriptionRef.textContent,
        price: priceRef.value,
        featured: isFeaturedRef.value == "featured" ? 1 : 0,
        categoryID: categoryIDRef.value,
        contents: contentsRef.textContent,
        allergens: allergensRef.textContent,
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
    fetch(`/be/admin/remove-image/${id}`, {
        method: "DELETE"    
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("There was a problem with your fetch operation:", error);
    });
}