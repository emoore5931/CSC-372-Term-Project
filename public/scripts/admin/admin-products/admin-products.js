/*
  Name: Ethan Moore
  Date: 12.4.2024
  CSC 372-01

  Script for the admin-products.ejs.
*/

const editProductOptions = document.querySelectorAll('.edit-option');
const archiveProductOptions = document.querySelectorAll('.archive-option');
const deleteProductOptions = document.querySelectorAll('.remove-option');

initOptionFunctionality();

/**
 * Initializes the functionality for product option buttons.
 */
function initOptionFunctionality() {
    for (let option of editProductOptions) {
        const productId = option.dataset.id;
        option.addEventListener('click', () => {
            editProductRedirect(productId);
        });
    }

    for (let option of deleteProductOptions) {
        const productId = option.dataset.id;
        option.addEventListener('click', () => {
            removeProduct(productId);
        });
    }
}

/**
 * Function to properly redirect the admin to the product edit page for the passed product
 * number.
 * @param {number} productNumber 
 */
function editProductRedirect(productNumber) {
    if (productNumber == -1) {
        //direct to example product edit page
        window.location.href = "/be/admin/edit";
    }

    window.location.href = `/be/admin/edit/${productNumber}`;
}

function removeProduct(productID) {
    fetch(`/be/admin/remove-kit/${productID}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        alert("Product removed successfully.");
    })
    .then(data => {
        window.location.reload();
    })
    .catch(error => {
        console.error(error);
    });
}