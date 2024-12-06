"use strict";
const productListRef = document.getElementById("productList");
const products = productListRef.children;
const checkoutBttnRef = document.getElementById("checkout");

function calcSubtotal() {
    let subtotal = 0;
    for (let product of products) {
        const productPrice = parseFloat(product.querySelector("#productPrice").textContent.split("$")[1]);
        const productQuantity = parseInt(product.querySelector("#productQuantity").value);

        subtotal += productPrice * productQuantity;
    }
    return subtotal;
}

function updateSubtotal() {
    const subtotal = calcSubtotal();
    document.getElementById("subTotal").textContent = `$${subtotal.toFixed(2)}`;
    return subtotal;
}

function calcSalesTax(subtotal) {
    subtotal = subtotal || calcSubtotal();
    return subtotal * 0.0675;
}

function updateSalesTax() {
    const salesTax = calcSalesTax();
    document.getElementById("salesTaxVal").textContent = `$${salesTax.toFixed(2)}`;
    return salesTax;
}

function calcDeliveryFee(subTotal) {
    if (!subTotal) subTotal = calcSubtotal();
    if (subTotal < 50) {
        return 5;
    } else {  
        return 0;
    }
}

function updateDeliveryFee() {
    const deliveryFee = calcDeliveryFee();
    document.getElementById("deliveryFee").textContent = `$${deliveryFee.toFixed(2)}`;
    return deliveryFee;
}

function calcTotal(subTotal, salesTax, deliveryFee) {
    if (!subTotal) subTotal = calcSubtotal();
    if (!salesTax) salesTax = calcSalesTax(subTotal);
    if (!deliveryFee) deliveryFee = calcDeliveryFee(subTotal);

    return subTotal + salesTax + deliveryFee;
}

function updateTotal() { 
    const total = calcTotal();
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
    return total;
}

function updateOrderSum(event) {
    if (event) {
        const productId = event.currentTarget.dataset.productId;
        const productCartRef = document.getElementById(`product${productId}`);
        const newQuantity = productCartRef.querySelector("#productQuantity").value;
        
        try {
            fetch('/be/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productID: productId,
                    quantity: newQuantity
                })
            }).then((response) => {
                if (response.status === 401) {
                    alert("Please log in to update quantity.");
                    window.location.href = "/be/login";
                } else if (!response.ok) {
                    alert("Error updating quantity. Please try again later.");
                    console.error(response);
                } else {
                    alert("Quantity updated successfully.");
                    window.location.reload();   
                }
            });
        } catch (error) {
            alert("Error updating quantity. Please try again later.");
            console.error(error);
        }
        // const productCartRef = document.getElementById(`product${productId}`);
        // const productQuantitySumRef = document.getElementById(`product${productId}SumQuantity`);
        // const productTotalSumRef = document.getElementById(`product${productId}SumTotal`);
        // productQuantitySumRef.textContent = newQuantity;
        // productTotalSumRef.textContent = `$${(parseFloat(productCartRef.querySelector("#productPrice").textContent.split("$")[1]) * parseInt(productCartRef.querySelector("#productQuantity").value)).toFixed(2)}`;
    }

    updateTotal(updateSubtotal(), updateSalesTax(), updateDeliveryFee());
    
}

function removeProduct(event) {
    const productId = event.currentTarget.dataset.productId;
    try {
        fetch('/be/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productID: productId
            })
        }).then((response) => {
            if (response.status === 401) {
                alert("Please log in to remove item.");
                window.location.href = "/be/login";
            } else if (!response.ok) {
                alert("Error removing item. Please try again later.");
                console.error(response);
            } else {
                alert("Item removed successfully.");
                window.location.reload();
            }
        });
    } catch (error) {
        alert("Error removing item. Please try again later.");
        console.error(error);
    }
}

function initQuantityUpdate() {
    for (let product of products) {
        product.querySelector(".changeQuantity").addEventListener("click", updateOrderSum);
    }
}

function initRemoveProduct() {
    for (let product of products) {
        product.querySelector(".removeItem").addEventListener("click", removeProduct);
    }
}

function checkout() {
    //temp functionality
    fetch('/be/cart/clear', {
        method: 'GET'
    }).then((response) => {
        if (response.status === 401) {
            alert("Please log in to clear cart.");
            window.location.href = "/be/login";
        } else if (!response.ok) {
            alert("Error clearing cart. Please try again later.");
            console.error(response);
        } else {
            alert("Checkout complete!");
            window.location.reload();
        }
    });
}

// init order sum
updateOrderSum();

initQuantityUpdate();
initRemoveProduct();

checkoutBttnRef.addEventListener("click", checkout);