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
    const id = event.currentTarget.dataset.id;
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
        ID: id,
        productData: {
            ID: id,
            name: productNameRef.value,
            price: priceRef.value,
            description: descriptionRef.value,
            featured: isFeaturedRef.checked ? 1 : 0,
        },
        mealKitData: {
            productID: id,
            categoryID: categoryIDRef.value,
            contents: contentsRef.value,
            allergens: allergensRef.value
        },

        kitImages: []
    }

    for (let container of imagesContainers) {
        const image = {
            ID: container.id.split("image")[1],
            kitID: id,
            url: container.getElementsByClassName("image-url")[0].value,
            description: container.getElementsByClassName("image-desc")[0].value,
            width: container.getElementsByClassName("image-w")[0].value,
            height: container.getElementsByClassName("image-h")[0].value
        }

        newProductData.kitImages.push(image);
    }

    fetch(`/be/admin/edit/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProductData)
    }).then(response => {
        if (response.status == 200) {
            alert("Changes submitted successfully");
            window.location.href = "/be/admin/products";
        } else {
            alert("Error submitting changes");
            throw new Error("Error submitting changes");
        }
    }).catch(error => {
        alert("Error submitting changes");
        console.error("There was a problem with your fetch operation:", error);
    });
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