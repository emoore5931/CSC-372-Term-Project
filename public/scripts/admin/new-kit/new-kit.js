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
    submitChanges();    
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
        productData: {
            name: productNameRef.value,
            price: priceRef.value,
            description: descriptionRef.value,
            featured: isFeaturedRef.checked ? 1 : 0,
        },
        mealKitData: {
            categoryID: categoryIDRef.value,
            contents: contentsRef.value,
            allergens: allergensRef.value
        },
        kitImages: []
    }

    // for (let container of imagesContainers) {
    //     const image = {
    //         ID: container.id.split("image")[1],
    //         url: container.getElementsByClassName("image-url")[0].value,
    //         description: container.getElementsByClassName("image-desc")[0].value,
    //         width: container.getElementsByClassName("image-w")[0].value,
    //         height: container.getElementsByClassName("image-h")[0].value
    //     }

    //     newProductData.kitImages.push(image);
    // }

    fetch(`/be/admin/kits/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProductData)
    }).then(response => {
        if (response.status == 200) {
            alert("Product submitted successfully");
            window.location.href = "/be/admin/products";
        } else {
            alert("Error submitting product");
            throw new Error("Error submitting product");
        }
    }).catch(error => {
        alert("Error submitting product");
        console.error("There was a problem with your fetch operation:", error);
    });
}

// function removeImage(id) {
    
// }