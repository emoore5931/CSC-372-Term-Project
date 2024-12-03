"use strict";
const productListRef = document.getElementById("productList");
const products = productListRef.children;

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
        const productQuantitySumRef = document.getElementById(`product${productId}SumQuantity`);
        const productTotalSumRef = document.getElementById(`product${productId}SumTotal`);
        productQuantitySumRef.textContent = productCartRef.querySelector("#productQuantity").value;
        productTotalSumRef.textContent = `$${(parseFloat(productCartRef.querySelector("#productPrice").textContent.split("$")[1]) * parseInt(productCartRef.querySelector("#productQuantity").value)).toFixed(2)}`;
    }

    updateTotal(updateSubtotal(), updateSalesTax(), updateDeliveryFee());
    
}

function initQuantityUpdate() {
    for (let product of products) {
        product.querySelector(".changeQuantity").addEventListener("click", updateOrderSum);
    }
}

// init order sum
updateOrderSum();

initQuantityUpdate();