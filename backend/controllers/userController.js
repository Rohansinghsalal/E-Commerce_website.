import ErrorHandler from "../middlewares/error.js";
import { userModel } from "../models/userModel.js";
import {orderModel} from "../models/orderModel.js"
import bcrypt from "bcryptjs";
import { sendCookie } from "../utils/cookie.js";

// register a user
export const registerUserController = async (req, res, next) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        let user = await userModel.findOne({email});
        if(user) {
            // return next(new ErrorHandler("Already Exist", 404));
            return res.status(400).send({
                success:false,
                message:"User already exits",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            avatar: {
                public_id: "This is sample id",
                url: "profilePicURL",
            },
            answer,
        });
        sendCookie(user, res, `Registered Succesfully ${user.name}`, 201);
        // res.status(201).send({
        //     success:true,
        //     message:"User registered successfully "
        // })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in register user ctrl",
            error,
        });
    }
};

// login a user
export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Enter email and passwrod", 401));
        }
        // as we have done password false in model
        const user = await userModel
            .findOne({ email: email })
            .select("+password");
        if (!user) {
            return next(new ErrorHandler("User not found ", 401));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        sendCookie(user, res, `Welcome back ${user.name}`, 200);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Erro in Login ctrl",
        });
    }
};

// logout a user
export const logoutUserController = async (req, res, next) => {
    res.status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .send({
            success: true,
            message: `Logout successfully`,
        });
};

// Forgot password
export const forgetPasswordController = async(req, res, next) => {
    try {
        const {email, answer, newPassword}=req.body;
        
        if(!email) {
            return next(new ErrorHandler("Email is Required", 400));
        }
        if(!answer) {
            return next(new ErrorHandler("Answer is Required", 400));
        }
        if(!newPassword) {
            return next(new ErrorHandler("New password is Required", 400));
        }
        // check
        const user = await userModel.findOne({email}).select("+password");
        if(!user) {
            return next(new ErrorHandler("Wrong Email", 404));
        }
        if(answer != user.answer) {
            return next(new ErrorHandler("Wrong Email or Answer, 400"));
        }
        // console.log(`User ans ${user.answer}`)
        const hashNewPassword = await bcrypt.hash(newPassword, 10);
        await userModel.findByIdAndUpdate(user._id, {password:hashNewPassword})
        res.status(200).send({
            success:true,
            message:"Password updated"
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in forget password ctrl"
        })
        
    }

}

// get user details
export const getUserDetails = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        res.status(200).send({
            success: true,
            message: "Getting user details",
            user,
        });
    } catch (error) {
        // console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in getting user details",
        });
    }
};

// update password
export const updatePassword = async (req, res, next) => {
    // const user = await userModel.findById(req.body.id).select("+password");
    const user = await userModel.findById(req.user.id).select("+password");

    const isPassMatch = await bcrypt.compare(
        req.body.oldPassword,
        user.password
    );
    if (!isPassMatch) {
        return next(new ErrorHandler("Old password doesn't match", 404));
    }

    if (req.body.newPassword != req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesn't match", 404));
    }
    req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10);
    user.password = req.body.newPassword;
    await user.save();
    res.status(200).send({
        success: true,
        message: "Password updated",
    });

    // sendCookie(user, res, "updated token", 200);
};

// update profile
export const updateProfileController = async(req, res, next)=> {
    try {
        const {name, email, password, address,phone}=req.body;
        const user = await userModel.findById(req.user._id);

        // password
        if(password && password.length < 6) {
            return next(new ErrorHandler("Pasword is required and 6 char long", 400));
        }
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            name:name || user.name,
            password:hashedPassword || user.password,
            phone:phone || user.phone ,
            address:address || user.address
        }, {new:true})
        res.status(200).send({
            success:true,
            message:"Profile updated successfully",
            updatedUser,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error while updateing profile ctrl",
            error
        })
        
    }
}

// get all orders
export const getUserOrderController = async(req, res, next)=> {
    try {
        const orders = await orderModel.find({buyer:req.user._id}).populate('products','-photo').populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error while fetching orders ctrl",
            error
        })
        
    }
}
//orders
export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" }); // latest wala top pr
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };

export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };


// ****** NOT by tech info yt *********
// update profile
// export const updateUserProfile = async (req, res, next) => {
//     try {
//         const newDetails = {
//             name: req.body.name,
//             email: req.body.email,
//         };
//         // we will update avatar later

//         const user = await userModel.findByIdAndUpdate(req.user.id, newDetails);
//         await user.save();
//         res.status(200).send({
//             success: true,
//             message: "Profile updated",
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(200).send({
//             success: false,
//             message: "Error in update user profile",
//         });
//     }
// };

// get all users-admin
// export const getAllUsers = async (req, res, next) => {
//     try {
//         const users = await userModel.find();

//         res.status(200).send({
//             success: true,
//             message: "All users fetched",
//             users,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             success: false,
//             message: "Error in getting all users",
//         });
//     }
// };

// get single user detail-admin
// export const getUserInfo = async (req, res, next) => {
//     try {
//         const user = await userModel.findById(req.params.id);
//         if (!user) {
//             return next(new ErrorHandler("User doesn't exist ", 404));
//         }

//         res.status(200).send({
//             success: true,
//             message: "User info fetched for admin",
//             user,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             success: false,
//             message: "Error in getting all users",
//         });
//     }
// };

// update user role - admin
// export const updateProfileRole = async (req, res, next) => {
//     try {
//         const newDetails = {
//             // name: req.body.name,
//             // email: req.body.email,
//             role: req.body.role,
//         };

//         const user = await userModel.findByIdAndUpdate(req.params.id, newDetails);
//         await user.save();
//         res.status(200).send({
//             success: true,
//             message: "Profile updated",
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(200).send({
//             success: false,
//             message: "Error in update profile by admin",
//         });
//     }
// };

// delete user -admin
// export const deleteUser = async (req, res, next) => {
//     try {
//         const user = await userModel.findById(req.params.id)
//         if(!user) {
//             return next(new ErrorHandler(`User doesn't exist with id ${req.params.id}`, 404));
//         }
//         // we will remove cloudinary later
//         await user.deleteOne();

//         res.status(200).send({
//             success:true,
//             message:"User deleted successfully",
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(200).send({
//             success: false,
//             message: "Error in delete user by admin",
//         });
//     }
// };
