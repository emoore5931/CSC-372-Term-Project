/*
  Name: Ethan Moore
  Date: 12.4.2024
  CSC 372-01

  Script for the admin-products.ejs.
*/

const editProductOptions = document.querySelectorAll('.edit-option');
const archiveProductOptions = document.querySelectorAll('.archive-option');
const deleteProductOptions = document.querySelectorAll('.delete-option');

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