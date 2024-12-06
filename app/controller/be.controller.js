"use strict";
const model = require("../model/be.model.js");
const adminModel = require("../model/admin.model.js");
const config = require("../../config/config.js");

function homePage(req, res, next) {
    const promoItem = {
        img: "",
        title: "Sample Product",
        description: "This is a sample product.",
        link: "/be/product/-1/info"
    }

    const data = model.getPromoProduct();
    if (data) {
        if (data.productData.name) promoItem.title = data.productData.name;
        if (data.productData.description) promoItem.description = data.productData.description;
        if (data.kitImages.length > 0) promoItem.img = data.kitImages[0].url;
        if (data.productData.ID) promoItem.link = `/be/product/${data.productData.ID}/info`;
    }

    try {
        res.render("index", {
            title: "Boxed Eats - Home",
            scripts: config.INDEX_SCRIPTS,
            stylesheets: config.INDEX_STYLES,
            promoItem: promoItem,
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function loginPage(req, res, next) {
    if (req.cookies.auth) {
        let id = req.cookies.auth;
        if (adminModel.userIsAdmin(id)) {
            res.redirect("/be/admin");
            return;
        }
        res.redirect("/be/cart");
        return;
    }

    try {
        res.render("account-login/login", {
            title: "Boxed Eats - User Login",
            scripts: config.U_LOGIN_SCRIPTS,
            stylesheets: config.U_LOGIN_STYLES,
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function store(req, res, next) {

    const retrievedKitDataList = model.getAllKitData();

    //extract necessary data
    const kitList = [];
    retrievedKitDataList.forEach((kitData) => {
        const kit = {
            id: kitData.productData.ID,
            title: kitData.productData.name,
            description: kitData.productData.description,
            isDiscounted: kitData.discountData ? true : false,
            price: kitData.productData.price,
            discountPrice: kitData.discountData ? calculateDiscount(kitData.productData.price) : null,
            img: kitData.kitImages.length > 0 ? kitData.kitImages[0].url : "",
            isFeatured: kitData.productData.featured ? true : false
        }

        kitList.push(kit);
    });

    try {
        res.render("products/products", {
            title: "Boxed Eats - Kits",
            scripts: config.STORE_SCRIPTS,
            stylesheets: config.STORE_STYLES,
            kitList: kitList,
            featuredLimit: config.STORE_FEATURED_LIM,
            kitLimit: config.STORE_KIT_LIM
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function kitsByProductName(req, res, next) {    
    const retrievedKitDataList = model.getKitDataByProductName(req.params.productName);

    //extract necessary data
    const kitList = [];
    if (retrievedKitDataList && retrievedKitDataList.length > 0) {
        retrievedKitDataList.forEach((kitData) => {
            const kit = {
                id: kitData.productData.ID,
                title: kitData.productData.name,
                description: kitData.productData.description,
                isDiscounted: kitData.discountData ? true : false,
                price: kitData.productData.price,
                discountPrice: kitData.discountData ? calculateDiscount(kitData.productData.price) : null,
                img: kitData.kitImages.length > 0 ? kitData.kitImages[0].url : "",
                isFeatured: kitData.productData.featured ? true : false
            }

            kitList.push(kit);
        });
    }

    try {
        res.render("products/products", {
            title: "Boxed Eats - Kits",
            scripts: config.STORE_SCRIPTS,
            stylesheets: config.STORE_STYLES,
            kitList: kitList,
            featuredLimit: config.STORE_FEATURED_LIM,
            kitLimit: config.STORE_KIT_LIM
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function cart(req, res, next) {
    if (!req.cookies.auth) {
        res.redirect("/be/login");
        return;
    }

    const userID = req.cookies.auth;
    const cartProducts = model.getUserShoppingCart(userID);
    const productList = [];

    cartProducts.forEach((product) => {
        const kitData = model.getKitData(product.productID);

        const cartProduct = {
            id: product.productID,
            quantity: product.quantity,
            title: kitData.productData.name,
            price: kitData.productData.price,
            img: kitData.kitImages.length > 0 ? kitData.kitImages[0].url : "",
            isDiscounted: kitData.discountData ? true : false,
            discountedPrice: kitData.discountData ? calculateDiscount(kitData.productData.price) : null
        }

        productList.push(cartProduct);
    });

    try {
        res.render("cart/cart", {
            title: "Boxed Eats - Cart",
            scripts: config.CART_SCRIPTS,
            stylesheets: config.CART_STYLES,
            productList: productList
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function adminProducts(req, res, next) {
    const products = adminModel.getAllKitData();

    try {
        res.render("admin/admin-products/admin-products", {
            title: "Product Listing",
            scripts: config.ADMIN_PRODUCT_SCRIPTS,
            stylesheets: config.ADMIN_PRODUCT_STYLES,
            products: products
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function adminUpload(req, res, next) {
    try {
        res.render("admin/admin-upload/admin-upload", {
            title: "Bulk Upload",
            scripts: config.ADMIN_UPLOAD_SCRIPTS,
            stylesheets: config.ADMIN_UPLOAD_STYLES,
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function adminEdit(req, res, next) {
    const productId = req.params.id;
    const productData = adminModel.getKitData(productId);

    try {
        res.render("admin/product-edit/product-edit", {
            title: "Product Edit",
            scripts: config.ADMIN_EDIT_SCRIPTS,
            stylesheets: config.ADMIN_EDIT_STYLES,
            productData: productData
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function productInfo(req, res, next) {
    const id = req.params.id;
    const kitData = model.getKitData(id);

    //extract necessary data
    const productData = {
        id: kitData.productData.ID,
        title: kitData.productData.name,
        images: kitData.kitImages,
        price: kitData.productData.price,
        description: kitData.productData.description,
        contents: kitData.mealKitData.contents.split(", "),
        allergens: kitData.mealKitData.allergens.split(","),
    };

    try {
        res.render("product-details/product-details", {
            title: `Boxed Eats - ${productData.title}`,
            product: productData,
            scripts: config.PRODUCT_DETAILS_SCRIPTS,
            stylesheets: config.PRODUCT_DETAILS_STYLES
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function upload(req, res, next) {
    const body = req.body;
    const data = body;

    console.log("Received data:");
    console.log(body);

    if (!data) {
        res.status(400).send("Invalid data.");
        return;
    }

    const uploadStatus = {
        isSuccessful: false,
        errAt: "",
        err: ""
    }

    console.log("Attempting to upload data...");

    if (data.products) {
        data.products.forEach((product) => {
            try {
                adminModel.uploadProduct(product);
                uploadStatus.isSuccessful = true;
            } catch (error) {
                console.error(error);
                uploadStatus.errAt = `Product upload failed for '${product.name}'`;
                uploadStatus.err = error.toString();
                res.status(500).send(uploadStatus);
            }
        });
    }

    if (data.mealKits) {
        data.mealKits.forEach((mealKit) => {
            try {
                adminModel.uploadMealKit(mealKit);
                uploadStatus.isSuccessful = true;
            } catch (error) {
                console.error(error);
                uploadStatus.errAt = `Meal kit upload failed for '${mealKit.productID}'`;
                uploadStatus.err = error.toString();
                res.status(500).send(uploadStatus);
            }
        });
    }

    if (data.images) {
        data.images.forEach((image) => {
            try {
                adminModel.uploadKitImage(image);
                uploadStatus.isSuccessful = true;
            } catch (error) {
                console.error(error);
                uploadStatus.errAt = `Image upload failed for '${image.kitID}'`;
                uploadStatus.err = error.toString();
                res.status(500).send(uploadStatus);
            }
        });
    }

    if (data.kitData) {
        data.kitData.forEach((kitData) => {
            try {
                adminModel.uploadKitData(kitData);
                uploadStatus.isSuccessful = true;
            } catch (error) {
                console.error(error);
                uploadStatus.errAt = `Kit data upload failed for '${kitData.productData.name}'`;
                uploadStatus.err = error.toString();
                res.status(500).send(uploadStatus);
            }
        });
    }

    res.status(200).send(uploadStatus);
    console.log("Upload complete.");
}

function signUp(req, res, next) {
    const data = req.body;
    console.log(`Received data: ${JSON.stringify(data)}`);

    if (!data) {
        res.status(400).send("Invalid data.");
        return;
    }

    if (model.userExists(data.username)) {
        res.status(409).send("Username already exists.");
        return;
    }

    try {
        model.newUser(data);
        res.status(200).send("User created successfully.");
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function login(req, res, next) {
    const data = req.body;
    const requestStatus = {
        isSuccessful: false,
        err: "",
        isAdmin: false
    }


    if (!data) {
        requestStatus.err = "Invalid data.";
        res.status(400).send(requestStatus);
        return;
    }

    const user = model.getUserFromLogin(data.username, data.password);

    if (!user) {
        requestStatus.err = "Invalid login credentials.";
        res.status(401).send("Invalid login credentials.");
        return;
    }

    if (user.userTypeID === 1 || adminModel.userIsAdmin(user.ID)) {
        requestStatus.isAdmin = true;
    }
    
    requestStatus.isSuccessful = true;

    res.setHeader('Content-Type', 'application/json');
    res.cookie("auth", user.ID, { maxAge: 3600000, httpOnly: true });
    res.status(200).send(JSON.stringify(requestStatus));
}

function signOut(req, res, next) {
    try {
        res.clearCookie("auth");
        res.redirect("/be/login");
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function removeImage(req, res, next) {
    const imageID = req.params.id;

    try {
        adminModel.deleteImage(imageID);
        res.status(200).send("Image removed successfully.");
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function removeKit(req, res, next) {
    const kitID = req.params.id;

    try {
        adminModel.deleteKitData(kitID);
        res.status(200).send("Kit removed successfully.");
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function addProductToCart(req, res, next) {
    if (!req.cookies.auth) {
        res.status(401).send("Unauthorized");
        return;
    }
    const data = req.body;
    const userID = req.cookies.auth;

    if (!data) {
        res.status(400).send("Invalid data.");
        return;
    }

    try {
        model.addProductToCart(userID, data.productID, data.quantity);
        res.status(200).send("Product added to cart successfully.");
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function removeProductFromCart(req, res, next) {
    if (!req.cookies.auth) {
        res.redirect("/be/login");
        return;
    }
    const productID = req.body.productID;
    const userID = req.cookies.auth;

    if (!productID) {
        res.status(400).send("Invalid data.");
        return;
    }

    try {
        model.removeProductFromCart(userID, productID);
        res.status(200).send("Product removed from cart successfully.");
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function clearCart(req, res, next) {
    if (!req.cookies.auth) {
        res.redirect("/be/login");
        return;
    }
    const userID = req.cookies.auth;

    try {
        model.clearCart(userID);
        res.status(200).send("Cart cleared successfully.");
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function editProduct(req, res, next) {
    const data = req.body;

    if (!data) {
        res.status(400).send("Invalid data.");
        return;
    }

    try {
        adminModel.updateKitData(data);
        res.status(200).send("Product updated successfully.");
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }

}

function newKit(req, res, next) {
    try {
        res.render("admin/new-kit/new-kit", {
            title: "New Kit",
            scripts: config.NEW_KIT_SCRIPTS,
            stylesheets: config.NEW_KIT_STYLES
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

function uploadKit(req, res, next) {
    const data = req.body;

    if (!data) {
        res.status(400).send("Invalid data.");
        return;
    }

    try {
        adminModel.uploadKitData(data);
        res.status(200).send("Kit uploaded successfully.");
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    homePage,
    loginPage,
    store,
    cart,
    adminProducts,
    adminUpload,
    adminEdit,
    productInfo,
    upload,
    signOut,
    removeImage,
    removeKit,
    login,
    signUp,
    addProductToCart,
    removeProductFromCart,
    clearCart,
    editProduct,
    newKit,
    uploadKit,
    kitsByProductName
};