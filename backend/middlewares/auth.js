import { userModel } from "../models/userModel.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        // return next(new ErrorHandler("Please login first is Auth", 404));
        return res.status(401).send({
            success:false,
            message:"Login First",
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id);    // user ko req.user mei save kr dere hai

    next();
};

export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };
