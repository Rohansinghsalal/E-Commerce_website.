import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { createCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

// CRUD operations
// create category
router.post(
    "/create-category",
    isAuthenticated,
    isAdmin,
    createCategoryController
);

// get all category
// if user is not login than also non-login user can see all category
router.get("/get-all-category", getAllCategoryController);

// get single category (slug kai bases mei dyncamic)
router.get("/get-category/:slug",getSingleCategoryController);

// update category(dynamin)
router.put("/update-category/:id", isAuthenticated, isAdmin, updateCategoryController);

// delete category(dynamic )
router.delete("/delete-category/:id", isAuthenticated, isAdmin, deleteCategoryController);
export default router;
