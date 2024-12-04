/*
  Name: Ethan Moore
  Date: 10.16.2024
  CSC 372-01

  Script for the admin-products.html.
*/

let optionsContainerRefs = document.getElementsByClassName("option-container");

initOptionFunctionality();

/**
 * Initializes the functionality for product option buttons.
 */
function initOptionFunctionality() {
    for (let i=0; i < optionsContainerRefs.length; i++) {
        optionsContainerRefs.item(i).childNodes.forEach(
            (button) => {button.addEventListener("click", () => {
                //temporary functionality
                //develop furthur once backend is developed
                editProductRedirect(0);
            });
        });
    }
}

/**
 * Function to properly redirect the admin to the product edit page for the passed product
 * number.
 * @param {number} productNumber 
 */
function editProductRedirect(productNumber) {
    if (productNumber == 0) {
        //direct to example product edit page
        window.location.href = "/be/admin/edit";
    }

    //further develop once backend functionality is developed
}