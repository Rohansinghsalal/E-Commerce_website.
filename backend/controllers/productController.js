import ErrorHandler from "../middlewares/error.js";
import { categoryModel } from "../models/categoryModel.js";
import { productModel } from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";
import { orderModel } from "../models/orderModel.js";

dotenv.config();
// payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Admin route->creating product ctrl POST
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res
                    .status(500)
                    .send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({
                    error: "photo is Required and should be less then 1mb",
                });
        }

        const products = new productModel({
            ...req.fields,
            slug: slugify(name),
        });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in crearing product",
        });
    }
};

// get all products
export const getAllProductsController = async (req, res, next) => {
    try {
        // adding multiple filteres like select
        // .select("-photo")->kyuki hume photo initial time pr noi chahiye
        // kyuki hum noi chahte hamri photo ka size bade
        // *****photo kai lia alag api kr lenge aur fir dono ko merge kr denge (below controller);
        // .populate('category') jo data hoga pura ka pura show hoga
        // .limit ki itne hee products dikhe
        const products = await productModel
            .find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "All Products ",
            countTotal: products.length,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in get all product ctrl",
            error,
        });
    }
};

// get product details(single-product)
export const getSingleProductController = async (req, res, next) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in get all product ctrl",
            error,
        });
    }
};

// get photo
export const productPhotoController = async (req, res, next) => {
    try {
        const product = await productModel
            .findById(req.params.pid)
            .select("photo"); // for only getting photo
        if (product && product.photo && product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
};

// update product
export const updateProductController = async (req, res, next) => {
    try {
        let product = await productModel.findById(req.params.pid);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        const { photo } = req.files;

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(req.fields.name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updte product",
        });
    }
};

// Delete product
export const deleteProductController = async (req, res, next) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        // if (!product) {
        //     return next(new ErrorHandler("Product not found", 404));
        // }
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in product delete ctrl",
            error,
        });
    }
};

// filters
export const productFiltersController = async (req, res, next) => {
    try {
        // getting two values(category, prices)
        const { checked, radio } = req.body;
        let args = {};
        // user can select both prices and category or single too
        // both
        if (checked.length > 0) args.category = checked;
        // price using mongodb variables
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            message: "Filtered",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in filters ctrl",
            error,
        });
    }
};

// product count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in product count",
            error,
            success: false,
        });
    }
};

// product list base on page
export const productListController = async (req, res) => {
    try {
        const perPage = 12;
        const page = req.params.page ? req.params.page : 1;
        // .select("-photo") as we have made different
        // route for it
        // and calling that route by using img tag in frontend
        // and passing that route in src
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};

// search product
export const searchProductController = async (req, res, next) => {
    try {
        const { keyword } = req.params;
        const results = await productModel
            .find({
                // searching for keyword in both name & description
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in search ctrl",
            error,
        });
    }
};

// similar products
export const relatedProductController = async (req, res, next) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid }, // not included that same product in similar products
            })
            .select("-photo")
            .limit(3)
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error while geting related product",
            error,
        });
    }
};

// get product by category
export const productCategoryController = async (req, res, next) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel
            .find({ category })
            .populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error While Getting products",
        });
    }
};

// payment gatway api
// token
export const braintreeTokenController = async (req, res, next) => {
    try {
        // see documentatin for more
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

// payments
export const brainTreePaymentController = async (req, res, next) => {
    try {
        // see docs
        const { cart, nonce } = req.body;
        let total = 0;
        // products ki price ko calculate
        cart.map((i) => {
            total += i.price;
        });

        let newTransition = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },

            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};

// *************NOt by techinfo yt***********

// Admin route->PUT updating product
// export const updateProductController = async (req, res, next) => {
//     try {
//         // taken let as we will change the same variable
//         let product = await productModel.findById(req.params.id);
//         if (!product) {
//             return next(new ErrorHandler("Product not found", 404));
//         }

//         product = await productModel.findByIdAndUpdate(req.params.id, req.body);
//         // now product is updated on the basis of req.body
//         res.status(200).send({
//             success: true,
//             message: "Product updated",
//         });
//     } catch (error) {
//         res.status(400).send({
//             success: false,
//             message: "Error in update product ctrl",
//             // error:error
//         });
//     }
// };
// create new revieew or update the review
// export const createProductReview = async (req, res, next) => {
//     try {
//         const { rating, comment, productId } = req.body;
//         const review = {
//             user: req.user._id,
//             name: req.user.name,
//             rating: Number(rating),
//             comment,
//         };
//         const product = await productModel.findById(productId);
//         const isReviewed = product.reviews.find(
//             (rev) => rev.user.toString() == req.user._id.toString()
//         );
//         if (isReviewed) {
//             product.reviews.forEach((rev) => {
//                 if (rev.user.toString() == req.user._id.toString()) {
//                     (rev.rating = rating), (rev.comment = comment);
//                 }
//             });
//         } else {
//             product.reviews.push(review);
//             product.numberOfReviews = product.reviews.length;
//         }
//         let avg = 0;

//         product.reviews.forEach((rev) => {
//             avg += rev.rating;
//         });
//         product.ratings = avg / product.reviews.length;
//         await product.save();
//         res.status(200).send({
//             success: true,
//             message: "Reviewed",
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             success: false,
//             message: "Error in craete product review",
//         });
//     }
// };

// get all reviews of a product
// export const getProductReviews = async (req, res, next) => {
//     try {
//         const product = await productModel.findById(req.query.id);
//         if (!product) {
//             return next(new ErrorHandler("Product not found", 404));
//         }
//         res.status(200).send({
//             success: true,
//             reviews: product.reviews,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             success: false,
//             message: "Error in getting product reviews",
//         });
//     }
// };

// delete review
// export const deleteReview = async (req, res, next) => {
//     try {
//         const product = await productModel.findById(req.query.productId);
//         if (!product) {
//             return next(new ErrorHandler("Product not found", 404));
//         }
//         // jo chahiye unko filter krdia
//         const reviews = product.reviews.filter(
//             (rev) => rev._id.toString() != req.query.id.toString()
//         );
//         let avg = 0;

//         reviews.forEach((rev) => {
//             avg += rev.rating;
//         });
//         const ratings = avg / reviews.length;
//         // await product.save();
//         const numberOfReviews = reviews.length;
//         await product.findByIdAndUpdate(req.query.productId, {
//             reviews,
//             ratings,
//             numberOfReviews,
//         });

//         res.status(200).send({
//             success: true,
//             reviews: product.reviews,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             success: false,
//             message: "Error in getting product reviews",
//         });
//     }
// };
