const discountDOM = require('./discount.dom');
const productDOM = require('./product.dom');

function KitImage(kitID, description, url, width, height) {
    this.kitID = kitID;
    this.description = description;
    this.url = url;
    this.width = width;
    this.height = height;
}

function MealKit(productID, categoryID, contents, allergens) {
    this.productID = productID;
    this.categoryID = categoryID;
    this.contents = contents;
    this.allergens = allergens;
}

/**
 * 
 * @param {productDOM.Product} productData 
 * @param {MealKit} mealKitData 
 * @param {KitImage[]} kitImages 
 * @param {discountDOM.DiscountType} discountType 
 */
function KitData(productData, mealKitData, kitImages, discountType) {
    this.productData = productData;
    this.mealKitData = mealKitData;
    this.kitImages = kitImages;
    this.discountType = discountType;
}

module.exports = {
    KitImage,
    MealKit,
    KitData
};