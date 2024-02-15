import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    // jo bhi slugify() kai andr pass krenge wo change hoga
    slug: {
        type:String,
        lowercase:true,
    }
})

export const categoryModel = mongoose.model("Category", categorySchema);