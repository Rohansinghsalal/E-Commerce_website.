import express from "express";
import {
    brainTreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getAllProductsController,
    getSingleProductController,
    productCategoryController,
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    relatedProductController,
    searchProductController,
    updateProductController,
} from "../controllers/productController.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import formidable from "express-formidable";

const router = express.Router();

// CRUD operations
// creting product-Admin
router.post(
    "/create-product",
    isAuthenticated,
    isAdmin,
    formidable(),
    createProductController
);

// get all products (we will make different for photo and other)
router.get("/get-all-product", getAllProductsController);

// get single product
router.get("/get-product/:slug", getSingleProductController);

// get photo
router.get("/product-photo/:pid", productPhotoController);

// update product
router.put(
    "/update-product/:pid",
    isAuthenticated,
    isAdmin,
    formidable(),
    updateProductController
);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

// filter product
router.post("/product-filters", productFiltersController);

// product count total for pagination (making in backend)
router.get("/product-count", productCountController);

// product count per page
router.get("/product-list/:page", productListController);

// search
router.get("/search/:keyword", searchProductController);

// similar product
// product and category similar products
router.get("/related-product/:pid/:cid", relatedProductController);

// category wise product
router.get('/product-category/:slug', productCategoryController);

// payment routes
// token
router.get("/braintree/token", braintreeTokenController);

// payments
router.post("/braintree/payment", isAuthenticated, brainTreePaymentController);

export default router;
