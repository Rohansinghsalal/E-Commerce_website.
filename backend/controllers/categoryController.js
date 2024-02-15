import ErrorHandler from "../middlewares/error.js";
import { categoryModel } from "../models/categoryModel.js";
import slugify from "slugify";

// creating category-Admin
export const createCategoryController = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) return next(new ErrorHandler("Name is require", 401));
        const existingCategory = await categoryModel.findOne({ name });
        // if categroy already exist
        if (existingCategory)
            return next(new ErrorHandler("Category already exist !", 401));

        const category = await new categoryModel({
            name,
            // if we pass name as (mens collectn) it wil change to (mens-collectn)
            slug: slugify(name),
        }).save();
        res.status(201).send({
            success: true,
            message: "New category created",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error in create category ctrl`,
        });
    }
};

// get all category
export const getAllCategoryController = async(req, res, next) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"Categories fetched successfully",
            categories,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error in getting categories ctrl`,
        });
    }
}
// get single category
export const getSingleCategoryController = async(req, res, next)=> {
    try {
        // const {slug}=req.params;
        const category = await categoryModel.findOne({slug:req.params.slug});
        if(!category) return next(new ErrorHandler("Category doens't exist ", 400));
        
        res.status(200).send({
            success:true,
            message:"Single category fetched",
            category,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error in getting single category ctrl`,
        });
        
    }
}

// updating category - Admin
export const updateCategoryController = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        // update -> new property(object) jisko true krna hota hai
        // agr noi kra to update noi hoga category page
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Category updated sucessfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error in updating category ctrl`,
        });
    }
};

// deleting category - Admin
export const deleteCategoryController = async(req, res, next)=> {
    try {
        const {id} = req.params;
        const category = await categoryModel.findById(id);
        if(!category) return next(new ErrorHandler("Category doesn't exist", 400));
        await category.deleteOne();
        res.status(200).send({
            success:true,
            message:"Category deleted",
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error in deleting category ctrl`,
        });
        
    }
}
