import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: [true, "Please enter product description"],
        },
        price: {
            type: Number,
            required: [true, "Please enter product's price"],
            maxLength: [8, "Price can't exceed 8 characters"],
        },
        category: {
            // category get karenge
            // jiske lia hamare pass already model hai therefore type
            type: mongoose.ObjectId,
            ref: "Category",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        photo: {
            // pic ko save kra skte hai kuch mb tak ki
            data: Buffer,
            contentType: String, // batana hai img hai ya doc
        },
        shipping: {
            // Order status
            type: Boolean,
        },
    },
    { timestamps: true }
);

export const productModel = mongoose.model("Product", productSchema);
