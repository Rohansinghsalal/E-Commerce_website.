import express from "express";
import dotenv from "dotenv";

import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// creating express instance
export const app = express();

// using .env
dotenv.config();

// using middleware
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials:true,
    })
);
app.use(express.json());
app.use(cookieParser()); // for using req.cookies

import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/category",categoryRouter);
app.use("/api/v1/products", productRouter);

// temp route for checking
// app.get("/", (req, res)=> {
//     res.status(200).send({
//         message:"Home"
//     })
// })

// middleware for error(use it in last in app.js)
app.use(errorMiddleware);
