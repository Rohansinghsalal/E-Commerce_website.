import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name"],
        maxLength: [30, "Can't exceed 30"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter the email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password should be more than 8 characters"],
        select: false, // if we apply find method or anything... to uska sab detail dikhe bas jisme select false hai wo noi
    },
    phone: {
        type: String,
        required: true,
      },
      address: {
        type: {},
        required: true,
      },
    answer: {
        type:String,
        required:true,
    },
    role: {
        // admin ya commen user
        type: Number,
        default: 0,
    }
});

// userSchema.methods.getResetPasswordToken = function () {
//     // Generating token
//     // crypto.randomBytes(20) -> it will give Buffer value
//     const resetToken = crypto.randomBytes(20).toString("hex");

//     // Hashing and adding resetPasswordToken to userSchema
//     this.resetPasswordToken = crypto
//         .createHash("sha256")
//         .update(resetToken)
//         .digest("hex");

//     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//     return resetToken;
// };
// export {getResetPasswordToken};

export const userModel = mongoose.model("User", userSchema);
