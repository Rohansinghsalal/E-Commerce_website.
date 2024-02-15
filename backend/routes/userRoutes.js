import express from "express";
import {
    registerUserController,
    loginUserController,
    getUserDetails,
    logoutUserController,
    forgetPasswordController,
    updateProfileController,
    getUserOrderController,
    orderStatusController,
    getAllOrdersController,
} from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
// logout handler
router.get("/logout", logoutUserController);
// forget pssword reset
router.post("/forget-password", forgetPasswordController);
// get user details
router.get("/get-my-details", isAuthenticated, getUserDetails);

// update profile
router.put("/update-profile", isAuthenticated, updateProfileController);

// show all user orders
router.get("/orders", isAuthenticated, getUserOrderController);

router.get("/all-orders", isAuthenticated, isAdmin, getAllOrdersController);
router.put(
    "/order-status/:orderId",
    isAuthenticated,
    isAdmin,
    orderStatusController
  );



// ******Not by techinfo yt******
// router.put("/update-password", isAuthenticated, updatePassword);
// router.put("/update-profile", isAuthenticated, updateUserProfile);

// router.get(
//     "/admin/get-all-users",
//     isAuthenticated,
//     isAdmin,
//     getAllUsers
// );
// router.get(
//     "/admin/get-user-info/:id",
//     isAuthenticated,
//     isAdmin,
//     getUserInfo
// );

// router.put("/admin/update-role/:id",isAuthenticated, authorizeRoles("admin"), updateProfileRole);
// router.delete("/admin/delete-user/:id",isAuthenticated, authorizeRoles("admin"),deleteUser);
export default router;
